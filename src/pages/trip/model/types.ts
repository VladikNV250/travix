import { LatLngExpression } from 'leaflet';

export interface TripInfo {
	id: string;
	name: string;
	totalDistance: number;
	days: string[];
}

export interface TripAnimationControls {
	autocontinue: boolean;
	isCameraMounted: boolean;
	stops: LatLngExpression[];
	toggleAutocontinue: () => void;
	toggleCameraMountion: () => void;
}
