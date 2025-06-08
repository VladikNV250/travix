import { Route } from "entities/route";
import { LatLngExpression, Map } from "leaflet";
import { useEffect } from "react"
import { TripAnimator } from "../TripAnimator";
import { Stop } from "entities/stop";
import { useAppDispatch } from "shared/lib";
import { setCurrentMarkerStop } from "features/routing";
import { useTripAnimator } from "./useTripAnimator";


export const useInitTripAnimator = (map: Map | null, route: Route, tripStops?: Stop[]) => {
    const animatorRef = useTripAnimator(true);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const tripAnimator = animatorRef?.current;
        return () => {
            tripAnimator?.stopAnimation();
        }
    }, [animatorRef])

    useEffect(() => {
        const tripAnimator = animatorRef?.current;

        if (!tripAnimator || !tripStops) return;

        dispatch(setCurrentMarkerStop(null));

        tripAnimator.onArriveStop = (stopLocation: LatLngExpression | null) => {
            const currentStop = tripStops.find(item => item.location === stopLocation);
            dispatch(setCurrentMarkerStop(currentStop ?? null));
        }

        tripAnimator.onAnimationContinue = () => {
            dispatch(setCurrentMarkerStop(null));
        }        

        return () => {
            tripAnimator.onArriveStop        = undefined;
            tripAnimator.onAnimationContinue = undefined;
            dispatch(setCurrentMarkerStop(null));
        }
    }, [dispatch, tripStops, animatorRef]);

    useEffect(() => {
        if (map && route && !animatorRef.current) {
            animatorRef.current = new TripAnimator(map, route);
        }
    }, [map, route, animatorRef])

    // useEffect(() => {
    //     if (!map || !route) return;

    //     animatorRef.current?.stopAnimation();
    //     animatorRef.current = new TripAnimator(map, route);

    //     return () => {
    //         animatorRef.current?.stopAnimation();
    //         animatorRef.current = null;
    //     };
    // }, [map, route]); 

    if (map && route && !animatorRef.current) {
        animatorRef.current = new TripAnimator(map, route);
    }

    return animatorRef.current;
}