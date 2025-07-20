import { Trip, compressTrip } from 'entities/trip';
import { encodeData } from 'shared/lib';

export const generateShareCode = (trip: Trip | null) => {
	if (!trip) return null;

	const tripRaw = compressTrip(trip);
	const tripCode = encodeData(tripRaw);

	return tripCode;
};
