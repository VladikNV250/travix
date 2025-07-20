import { v4 as uuidv4 } from 'uuid';

import { decompressImage } from 'entities/image';

import { Stop, StopRaw } from '../model';

export const decompressStop = (stopRaw: StopRaw): Stop => {
	return {
		id: uuidv4(),
		address: stopRaw[0],
		location: stopRaw[1],
		countryCode: stopRaw[2],
		arrivalDate: stopRaw[3],
		departureDate: stopRaw[4],
		notes: stopRaw[5],
		images: stopRaw[6].map(decompressImage),
	};
};
