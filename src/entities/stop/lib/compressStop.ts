import { latLng } from 'leaflet';

import { compressImage } from 'entities/image';

import { Stop, StopRaw } from '../model';

export const compressStop = (stop: Stop): StopRaw => {
	const stopLocation = latLng(stop.location);

	return [
		stop.address,
		[stopLocation.lat, stopLocation.lng],
		stop.countryCode || '',
		stop.arrivalDate,
		stop.departureDate,
		stop.notes ?? '',
		stop.images.map(compressImage),
	];
};
