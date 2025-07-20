import { TripRaw, decompressTrip } from 'entities/trip';
import { decodeData } from 'shared/lib';

export const parseShareCode = (shareMessageWithCode: string) => {
	try {
		/**
		 * Split by double space between share message and code, and get only code
		 * If undefined shareMessageWithCode is a code
		 */
		const onlyCode =
			shareMessageWithCode.split(`  `)?.[1] ?? shareMessageWithCode;

		const tripRaw = decodeData<TripRaw>(onlyCode);

		return decompressTrip(tripRaw);
	} catch (e) {
		console.error(`[TRAVIX] Parsing error | `, e);
		return null;
	}
};
