import { latLng } from 'leaflet';
import * as LZString from 'lz-string';

import { Image } from 'entities/image';
import { Stop } from 'entities/stop';
import { Trip, createTrip } from 'entities/trip';
import { SHARE_MESSAGE } from 'features/share-trip/config';
import { generateStopId } from 'features/stops/model';

import { TripRaw } from '../types';

export const parseShareCode = (shareMessageWithCode: string) => {
	const onlyCode =
		shareMessageWithCode.split(`${SHARE_MESSAGE}  `)?.[1] ?? // split by share message and get only code
		shareMessageWithCode; // if undefined shareMessageWithCode is a code

	const tripRaw: TripRaw = JSON.parse(
		LZString.decompressFromEncodedURIComponent(onlyCode),
	);

	const routes = tripRaw.r.map(route => latLng(route));
	const stops: Stop[] = tripRaw.s.map(stopRaw => {
		const images: Image[] = stopRaw[6].map(imageRaw => ({
			id: imageRaw[0],
			url: imageRaw[1],
		}));

		const stop: Stop = {
			id: generateStopId(),
			address: stopRaw[0],
			location: stopRaw[1],
			countryCode: stopRaw[2],
			arrivalDate: stopRaw[3],
			departureDate: stopRaw[4],
			notes: stopRaw[5],
			images: images,
		};

		return stop;
	});

	const trip = createTrip();

	return {
		...trip,
		name: tripRaw.n,
		color: tripRaw.c,
		route: routes,
		stops,
	} as Trip;
};
