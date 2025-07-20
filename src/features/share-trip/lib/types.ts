import { LatLngTuple } from 'leaflet';

export type ImageRaw = [
	/** image id */
	string,
	/** image url */
	string,
];

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

export interface TripRaw {
	/** version of code */
	readonly v: number;
	/** trip name */
	readonly n: string;
	/** trip color */
	readonly c: string;
	/** stops list */
	readonly s: StopRaw[];
	/** route list */
	readonly r: LatLngTuple[];
}
