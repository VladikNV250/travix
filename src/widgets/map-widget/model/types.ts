import { DivIcon } from 'leaflet';

import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';

export interface MapRouteData {
	readonly key: string;
	trip: Trip;
}

export interface MapMarkerData {
	readonly key: string;
	stop: Stop;
	icon: DivIcon;
}
