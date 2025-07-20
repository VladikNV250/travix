import { decompressImage } from 'entities/image';

import { Stop, StopRaw, generateStopId } from '../model';

export const decompressStop = (stopRaw: StopRaw): Stop => {
	return {
		id: generateStopId(),
		address: stopRaw[0],
		location: stopRaw[1],
		countryCode: stopRaw[2],
		arrivalDate: stopRaw[3],
		departureDate: stopRaw[4],
		notes: stopRaw[5],
		images: stopRaw[6].map(decompressImage),
	};
};
