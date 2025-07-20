import { LatLngExpression, LatLngTuple } from 'leaflet';

import { Image, ImageRaw } from 'entities/image';

export interface Stop {
	readonly id: string;
	address: string;
	location: LatLngExpression;
	countryCode: string | null;
	arrivalDate: string;
	departureDate: string;
	notes?: string;
	images: Image[];
}

export type StopRaw = [
	/** address */
	string,
	/** location */
	LatLngTuple,
	/** countryCode */
	string,
	/** arrivalDate */
	string,
	/** departureDate */
	string,
	/** notes */
	string,
	/** images urls */
	ImageRaw[],
];
