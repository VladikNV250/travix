import { latLng } from 'leaflet';

import { decompressStop } from 'entities/stop';

import { createTrip } from '../model';
import { Trip, TripRaw } from '../model/types';

export const decompressTrip = (tripRaw: TripRaw): Trip => {
	const route = tripRaw.r.map(route => latLng(route));
	const stops = tripRaw.s.map(decompressStop);
	const trip = createTrip({
		name: tripRaw.n,
		color: tripRaw.c,
		route,
		stops,
	});

	return trip;
};
