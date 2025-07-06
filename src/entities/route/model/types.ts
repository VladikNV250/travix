import { LatLng } from 'leaflet';

export interface Route {
	readonly id: string;
	coordinates: LatLng[];
}

export interface RouteSegment {
	start: LatLng;
	end: LatLng;
	distance: number;
	duration: number;
}
