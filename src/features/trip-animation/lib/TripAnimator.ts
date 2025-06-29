import { 
    DivIcon,
    latLng, 
    LatLng, 
    latLngBounds, 
    LatLngExpression, 
    Map, 
    marker, 
    Marker, 
    Point,
} from "leaflet";
import simplify from "simplify-js";
import { 
    Route, 
    RouteSegment 
} from "entities/route";
import { DirectionMarker } from "shared/assets";

export class TripAnimator {
    private readonly ANIMATION_SPEED: number = 12.5 * 4
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
    private lastAngle            : number;
    
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
        this.route               = this.optimizeRoute(route, 0.0075);
        this.notVisitedStops     = [];
        this.currentProgress     = 0;
        this.animationFrameId    = null;
        this.isAnimating         = false;
        this.duration            = duration || 100000; // 100s
        this.startTime           = null;
        this.marker              = null;
        this.segments            = this.createSegments(this.route);
        this.totalDuration       = this.getTotalDuration(this.segments);
        this.autocontinue        = true;
        this.isCameraMounted     = true;
        this.isPaused            = false;
        this.lastAngle           = 0;
    }

    public startAnimation(stops: LatLngExpression[]): void {
        if (!this.isAnimating && this.map) {
            const icon = new DivIcon({
                html: `<img src="${DirectionMarker}" alt="Direction Marker" width="25" height="28" />`,
                className: '',
                iconSize: [25, 28]
            })

            this.notVisitedStops = [...stops];

            if (this.isCameraMounted) {
                this.map?.fitBounds(latLngBounds(this.route), {
                    paddingBottomRight: [300, 50], // add +250 right padding, because fitBounds doesn't center route correctly 
                    paddingTopLeft: [50, 200], // add +150 top padding, for StopInfoPanel
                });
            }
            this.isAnimating = true;
            if (!this.marker) {
                this.marker = marker(
                    this.route[0],
                    {
                        icon,
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

    private getAngle(from: LatLng, to: LatLng): number {
        const φ1 = from.lat * Math.PI / 180;
        const φ2 = to.lat * Math.PI / 180;
        const Δλ = (to.lng - from.lng) * Math.PI / 180;

        const y = Math.sin(Δλ) * Math.cos(φ2);
        const x = Math.cos(φ1) * Math.sin(φ2) -
                Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
        const θ = Math.atan2(y, x);

        return (θ * 180 / Math.PI + 360) % 360;
    }

    private rotateMarker(angle: number): void {
        const iconElement = this.marker?.getElement()?.children[0] as HTMLElement;

        if (iconElement) {
            iconElement.style.transform = `rotate(${angle}deg)`;
        }
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

        return segments.map(segment => ({
            ...segment,
            duration: segment.distance / this.ANIMATION_SPEED
        }));
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

    private interpolateAngle(angleStart: number, angleEnd: number, progress: number): number {
        const delta = ((((angleEnd - angleStart) + 540) % 360) - 180); 
        return angleStart + delta * progress;
    }

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

        const newAngle = this.getAngle(
            currentSegment.start,
            currentSegment.end,
        )

        const angle = this.interpolateAngle(this.lastAngle, newAngle, segmentProgress);
        this.rotateMarker(angle);
        this.marker?.setLatLng(newPosition);
        this.currentProgress = totalProgress;
        this.lastAngle = angle;

        if (totalProgress < 1 && this.isAnimating && this.notVisitedStops.length > 0) {
            if (this.isNearToStop(latLng(newPosition), this.notVisitedStops, 1000)) {
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