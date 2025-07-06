import { useMemo } from 'react';

import { selectTrips } from 'features/trip';
import { useAppSelector } from 'shared/lib';

import { MapRouteData } from './types';

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
