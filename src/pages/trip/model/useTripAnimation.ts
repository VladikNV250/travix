import { useMemo } from 'react';

import { Trip } from 'entities/trip';
import { useMap } from 'features/map';
import { selectRoute } from 'features/routing';
import {
	useInitTripAnimator,
	useTripAnimatorState,
} from 'features/trip-animation';
import { useAppSelector } from 'shared/lib';

import { TripAnimationControls } from './types';

export const useTripAnimation = (trip?: Trip) => {
	const { map } = useMap();
	const route = useAppSelector(selectRoute(trip?.id ?? ''));
	const tripAnimator = useInitTripAnimator(map, route, trip?.stops);

	const [autocontinue, setAutocontinue] = useTripAnimatorState(
		tripAnimator,
		'autocontinue',
		true,
	);
	const [isCameraMounted, setIsCameraMounted] = useTripAnimatorState(
		tripAnimator,
		'isCameraMounted',
		true,
	);

	const routeStops = useMemo(
		() => trip?.stops.map(stop => stop.location) ?? [],
		[trip],
	);

	return {
		autocontinue,
		isCameraMounted,
		stops: routeStops,
		toggleAutocontinue: setAutocontinue,
		toggleCameraMounted: setIsCameraMounted,
	} as TripAnimationControls;
};
