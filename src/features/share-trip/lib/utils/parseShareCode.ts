import { TripRaw, decompressTrip } from 'entities/trip';
import { decodeData } from 'shared/lib';

export const parseShareCode = (shareMessageWithCode: string) => {
	try {
		const parts = shareMessageWithCode.trim().split(/\s+/);
		const code = parts.at(-1) ?? shareMessageWithCode;

		const tripRaw = decodeData<TripRaw>(code);

		return decompressTrip(tripRaw);
	} catch (e) {
		console.error(`[TRAVIX] Parsing error | `, e);
		return null;
	}
};
