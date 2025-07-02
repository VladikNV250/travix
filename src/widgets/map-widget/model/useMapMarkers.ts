import { useMemo } from 'react';

import { selectTrips } from 'features/trip';
import { useAppSelector } from 'shared/lib';

import { createMarkerIcon } from '../lib';
import { MapMarkerData } from './types';

export const useMapMarkers = (): MapMarkerData[] => {
	const trips = useAppSelector(selectTrips);

	const markers: MapMarkerData[] = useMemo(() => {
		if (trips.length === 0) return [];

		return trips.flatMap(trip => {
			const icon = createMarkerIcon(trip.color || '#ff0000');
			if (trip.stops.length === 0) return [];
			return trip.stops.map(stop => ({
				key: stop.id,
				stop,
				icon,
			}));
		});
	}, [trips]);

	return markers;
};
