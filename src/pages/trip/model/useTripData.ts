import { useMemo } from 'react';
import { useParams } from 'react-router';

import { latLng } from 'leaflet';

import { selectTrip } from 'entities/trip';
import { calculateTripDays } from 'features/stops';
import { useAppSelector } from 'shared/lib';

import { TripInfo } from './types';

export const useTripData = () => {
	const { tripId } = useParams<{ tripId: string }>();
	const trip = useAppSelector(selectTrip(tripId ?? ''));

	const totalDistance = useMemo(
		() =>
			trip?.stops.slice(0, -1).reduce((total, stop, index) => {
				const nextStop = trip.stops[index + 1];
				return (
					total +
					(nextStop ? latLng(stop.location).distanceTo(nextStop.location) : 0)
				);
			}, 0) ?? 0,
		[trip?.stops],
	);

	const tripDays = useMemo(
		() => calculateTripDays(trip?.stops ?? []),
		[trip?.stops],
	);

	const tripInfo: TripInfo | null = useMemo(() => {
		if (!trip) return null;
		return {
			id: trip.id ?? '',
			name: trip.name ?? '',
			totalDistance: Math.floor(totalDistance / 1000),
			days: tripDays,
		};
	}, [trip, totalDistance, tripDays]);

	return {
		trip,
		tripInfo,
	};
};
