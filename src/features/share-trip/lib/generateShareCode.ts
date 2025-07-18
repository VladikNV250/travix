import { LatLngTuple, latLng } from 'leaflet';
import * as LZString from 'lz-string';

import { Trip } from 'entities/trip';

import { StopRaw, TripRaw } from './types';

export const generateShareCode = (trip: Trip | null) => {
	if (!trip) return null;

	const stopsRaw = trip.stops.map(stop => {
		const stopLocation = latLng(stop.location);
		return [
			stop.address,
			[stopLocation.lat, stopLocation.lng],
			stop.countryCode,
			stop.arrivalDate,
			stop.departureDate,
			stop.notes ?? '',
			stop.images.map(i => i.url),
		] as StopRaw;
	});

	const routeRaw = trip.route.map(
		coords => [coords.lat, coords.lng] as LatLngTuple,
	);

	/* eslint-disable id-length */
	const tripRaw: TripRaw = {
		v: 1,
		n: trip.name,
		c: trip.color,
		s: stopsRaw,
		r: routeRaw,
	};
	/* eslint-enable id-length */

	const tripCode = LZString.compressToEncodedURIComponent(
		JSON.stringify(tripRaw),
	);

	return tripCode;
};
