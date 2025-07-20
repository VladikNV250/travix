import { getGeocode } from 'entities/geo';
import { Stop, validateStop } from 'entities/stop';

import { generateStopId } from './generateStopId';

// TODO: We need to review this creating stops
export const createStop = async (data: Partial<Stop>): Promise<Stop | null> => {
	const stop: Stop = {
		id: generateStopId(),
		address: data.address ?? '',
		location: data.location ?? {
			lat: 0,
			lng: 0,
		},
		countryCode: data.countryCode ?? null,
		arrivalDate: data.arrivalDate ?? '',
		departureDate: data.departureDate ?? '',
		notes: data.notes,
		images: data.images ?? [],
	};

	if (!validateStop(stop)) return null;

	const geocode = await getGeocode(stop.address);

	if (geocode) {
		stop.location = geocode.location;
		stop.countryCode = geocode.countryCode;
	} else {
		throw new Error('Cannot get geocode info of stop!');
	}

	return stop;
};
