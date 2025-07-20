import { LatLng, LatLngTuple } from 'leaflet';

import { Stop, StopRaw } from 'entities/stop';

export interface Trip {
	readonly id: string;
	name: string;
	color: string;
	stops: Stop[];
	route: LatLng[]; //Q: Does we need this? It doesn't have coords
}

export interface TripsState {
	trips: Trip[];
}

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
