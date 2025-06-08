import { 
    Icon, 
    latLng, 
    LatLng, 
    LatLngExpression, 
    Map, 
    marker, 
    Marker, 
    Point 
} from "leaflet";
import simplify from "simplify-js";
import { 
    Route, 
    RouteSegment 
} from "entities/route";
import car from "shared/assets/icons/Group 20.png";


export class TripAnimator {
    private map                  : Map | null;
    private route                : LatLng[];
    private notVisitedStops      : LatLngExpression[];
    private duration             : number;
    private segments             : RouteSegment[];
    private isAnimating          : boolean;
    private isPaused             : boolean;
    private animationFrameId     : number | null;
    private startTime            : number | null;
    private marker               : Marker | null;
    private currentProgress      : number;
    private totalDuration        : number;
    
    public isCameraMounted       : boolean;
    public autocontinue          : boolean;
     
    public onArriveStop?         : (stop: LatLngExpression | null) => void 
    public onAnimationStart?     : () => void
    public onAnimationPause?     : () => void
    public onAnimationEnd?       : () => void
    public onAnimationContinue?  : () => void
    

    constructor(
        map: Map | null,
        route: Route,
        duration?: number,
    ) {
        this.map                 = map;
        this.route               = this.optimizeRoute(route);
        this.notVisitedStops     = [];
        this.currentProgress     = 0;
        this.animationFrameId    = null;
        this.isAnimating         = false;
        this.duration            = duration || 30000; // 30s
        this.startTime           = null;
        this.marker              = null;
        this.segments            = this.createSegments(this.route);
        this.totalDuration       = this.getTotalDuration(this.segments);
        this.autocontinue        = true;
        this.isCameraMounted     = true;
        this.isPaused            = false;
    }

    public startAnimation(stops: LatLngExpression[]): void {
        if (!this.isAnimating && this.map) {
            const icon = new Icon({
                iconUrl: car,
                iconSize: [100, 34],
            })

            this.notVisitedStops = [...stops];

            if (this.isCameraMounted) {
                this.map.setZoom(11);
                this.map.panTo(this.route[0]);
            }
            this.isAnimating = true;
            if (!this.marker) {
                this.marker = marker(
                    this.route[0],
                    {
                        icon
                    }
                ).addTo(this.map)
            }

            this.startTime = null;
            this.animationFrameId = requestAnimationFrame(this.animate);
            this.onAnimationStart?.();
        }
    }

    public stopAnimation(): void {
        this.pauseAnimation();
        this.marker?.remove();
        this.marker = null;
        this.startTime = null;
        this.currentProgress = 0;
        this.onAnimationEnd?.();
    }

    public pauseAnimation(): void {
        this.isAnimating = false;
        this.isPaused = true;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.onAnimationPause?.();
    }

    public continueAnimation(): void {
        this.isPaused = false;
        this.isAnimating = true;
        const offset = this.currentProgress * this.totalDuration;
        this.startTime = performance.now() - offset;
        this.animationFrameId = requestAnimationFrame(this.animate);
        this.onAnimationContinue?.();
    }

    public toggleAutocontinue(state?: boolean): void {
        this.autocontinue = state ?? !this.autocontinue;
    }

    public setDuration(duration: number): void {
        this.duration = duration;
    }

    public getDuration(): number {
        return this.duration;
    }
    
    private optimizeRoute(route: Route, tolerance: number = 0.00005): LatLng[] {
        const pointRoute: Point[] = route.coordinates.map(({ lat, lng }) => new Point(lat, lng))
        const simplified = simplify(pointRoute, tolerance);
        return simplified.map(({ x, y }) => new LatLng(x, y));
    }

    private createSegments(route: LatLng[]): RouteSegment[] {
        const segments: RouteSegment[] = route.slice(0, -1).map((point, index) => {
            const nextPoint = route[index + 1];
            const distance = point.distanceTo(nextPoint);
            return {
                start: point,
                end: nextPoint,
                distance,
                duration: 0
            }
        });

        const totalDistance = this.getTotalDistance(segments);
        const animationSpeed = totalDistance / this.duration;

        return segments.map(segment => ({
            ...segment,
            duration: segment.distance / animationSpeed
        }));
    }

    private getTotalDistance(segments: RouteSegment[]): number {
        return segments.reduce((total, segment) => total + segment.distance, 0);
    }

    private getTotalDuration(segments: RouteSegment[]): number {
        return segments.reduce((total, segment) => total + segment.duration, 0);
    }

    private isNearToStop (coord: LatLng, stops: LatLngExpression[], thresholdInMeters: number = 500 ): boolean {
        return stops.some(stop => coord.distanceTo(stop) < thresholdInMeters) 
    }

    private interpolatePosition(from: LatLng, to: LatLng, progress: number): LatLngExpression {
        return [
            from.lat + (to.lat - from.lat) * progress,
            from.lng + (to.lng - from.lng) * progress
        ]
    };

    private animate = async (timestamp: number): Promise<void> => {
        if (!this.startTime) {
            this.startTime = timestamp;
        }

        const elapsed = timestamp - this.startTime;
        const totalProgress = Math.min(elapsed / this.totalDuration, 1);

        let accumulativeTime = 0;
        let segmentIndex = 0;
        let segmentProgress = 0;

        /** Find current segment with the marker */
        for (let i = 0; i < this.segments.length; i++) {
            const segmentEndTime = accumulativeTime + this.segments[i].duration;

            if (elapsed <= segmentEndTime) {
                segmentIndex = i;
                segmentProgress = (elapsed - accumulativeTime) / this.segments[i].duration;
                break;
            }

            accumulativeTime = segmentEndTime;
        }

        const currentSegment = this.segments[segmentIndex];
        const newPosition = this.interpolatePosition(
            currentSegment.start,
            currentSegment.end,
            segmentProgress
        )
        
        this.marker?.setLatLng(newPosition);
        if (this.isCameraMounted) {
            this.map?.panTo(newPosition);
        }
        this.currentProgress = totalProgress;

        if (totalProgress < 1 && this.isAnimating && this.notVisitedStops.length > 0) {
            if (this.isNearToStop(latLng(newPosition), this.notVisitedStops)) {
                const currentStop = this.notVisitedStops.shift();  
                this.onArriveStop?.(currentStop ?? null);
                this.pauseAnimation();
                this.isPaused = false; // pause animation, but state don't set in true, because it is paused not by user.
                if (this.autocontinue) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    if (!this.isPaused) { // If it is not paused by user, continue Animation.
                        this.continueAnimation();
                    }
                }
            } else {
                this.animationFrameId = requestAnimationFrame(this.animate);
            }
        } else {
            this.isAnimating = false;
            this.marker?.remove();
            this.marker = null;
            this.currentProgress = 1;
            this.notVisitedStops = [];
            this.onAnimationEnd?.();
        }
    };
}