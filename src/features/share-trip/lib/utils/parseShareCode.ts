import { latLng } from 'leaflet';

import { Image } from 'entities/image';
import { Stop } from 'entities/stop';
import { Trip, createTrip } from 'entities/trip';
import { generateStopId } from 'features/stops/model';
import { decompressData } from 'shared/lib';

import { TripRaw } from '../types';

export const parseShareCode = (shareMessageWithCode: string) => {
	try {
		/**
		 * Split by double space between share message and code, and get only code
		 * If undefined shareMessageWithCode is a code
		 */
		const onlyCode =
			shareMessageWithCode.split(`  `)?.[1] ?? shareMessageWithCode;

		const tripRaw = decompressData<TripRaw>(onlyCode);

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

		const parsedTrip: Trip = {
			...trip,
			name: tripRaw.n,
			color: tripRaw.c,
			route: routes,
			stops,
		};

		return parsedTrip;
	} catch (e) {
		console.error(`[TRAVIX] Parsing error | `, e);
		return null;
	}
};
