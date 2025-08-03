import { v4 as uuidv4 } from 'uuid';

import { getGeocode } from 'entities/geo';
import { Stop } from 'entities/stop';

// TODO: We need to review this creating stops
export const createStop = async (data: Partial<Stop>): Promise<Stop | null> => {
	const stop: Stop = {
		id: uuidv4(),
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

	const geocode = await getGeocode(stop.address);

	if (geocode) {
		stop.location = geocode.location;
		stop.countryCode = geocode.countryCode;
	} else {
		console.error('Cannot get geocode info of stop!');
		return null;
	}

	return stop;
};
