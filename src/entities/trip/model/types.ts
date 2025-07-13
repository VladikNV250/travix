import { LatLng } from 'leaflet';

import { Stop } from 'entities/stop';

export interface Trip {
	readonly id: string;
	name: string;
	color: string;
	stops: Stop[];
	route: LatLng[];
}

export interface TripsState {
	trips: Trip[];
}
