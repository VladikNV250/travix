import { useEffect } from 'react';

import { LatLngExpression, Map } from 'leaflet';

import { Route } from 'entities/route';
import { Stop } from 'entities/stop';
import { setActiveRouteId, setCurrentMarkerStop } from 'features/routing';
import { useAppDispatch } from 'shared/lib';

import { TripAnimator } from '../TripAnimator';
import { useTripAnimator } from './useTripAnimator';

export const useInitTripAnimator = (
	map: Map | null,
	route: Route,
	tripStops?: Stop[],
) => {
	const { tripAnimator, setTripAnimator } = useTripAnimator();
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			tripAnimator?.stopAnimation();
		};
	}, [setTripAnimator, tripAnimator]);

	useEffect(() => {
		if (!tripAnimator || !tripStops) return;

		dispatch(setCurrentMarkerStop(null));

		tripAnimator.onArriveStop = (stopLocation: LatLngExpression | null) => {
			const currentStop = tripStops.find(
				item => item.location === stopLocation,
			);
			dispatch(setCurrentMarkerStop(currentStop ?? null));
		};

		tripAnimator.onAnimationContinue = () => {
			dispatch(setCurrentMarkerStop(null));
		};

		return () => {
			tripAnimator.onArriveStop = undefined;
			tripAnimator.onAnimationContinue = undefined;
			dispatch(setCurrentMarkerStop(null));
		};
	}, [dispatch, tripStops, tripAnimator]);

	useEffect(() => {
		if (map && route) {
			dispatch(setActiveRouteId(route.id));
			setTripAnimator(new TripAnimator(map, route));
		}
	}, [map, route, setTripAnimator, dispatch]);

	return tripAnimator;
};
