import { useMemo } from 'react';

import { useAppSelector } from 'shared/lib';

import { MapRouteData } from './types';
import { selectTrips } from 'entities/trip';

export const useMapRoutes = (): MapRouteData[] => {
	const trips = useAppSelector(selectTrips);

	const routes: MapRouteData[] = useMemo(() => {
		return trips.map(trip => ({
			key: trip.id,
			trip,
		}));
	}, [trips]);

	return routes;
};
