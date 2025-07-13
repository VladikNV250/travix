import { LatLngLiteral } from 'leaflet';

export interface Geocode {
	location: LatLngLiteral;
	countryCode: string | null;
}

export interface Prediction {
	readonly id: string;
	text: string;
}
