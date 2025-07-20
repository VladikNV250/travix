import { LatLngTuple } from 'leaflet';

import { compressStop } from 'entities/stop';

import { Trip } from '../model';
import { TripRaw } from '../model/types';

export const compressTrip = (trip: Trip): TripRaw => {
	const stopsRaw = trip.stops.map(compressStop);
	const routeRaw = trip.route.map(
		coords => [coords.lat, coords.lng] as LatLngTuple,
	);

	/* eslint-disable id-length */
	return {
		v: 1,
		n: trip.name,
		c: trip.color,
		s: stopsRaw,
		r: routeRaw,
	};
	/* eslint-enable id-length */
};
