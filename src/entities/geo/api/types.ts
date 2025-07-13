import { LatLngLiteral } from 'leaflet';

// More info about geocode response in https://developers.google.com/maps/documentation/geocoding/requests-geocoding#GeocodingResponses
// More info about autocomplete response in https://developers.google.com/maps/documentation/places/web-service/place-autocomplete#about_response

export enum GeoStatusCode {
	OK = 'OK',
	ZERO_RESULTS = 'ZERO_RESULTS',
	OVER_DAILY_LIMIT = 'OVER_DAILY_LIMIT',
	OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
	REQUEST_DENIED = 'REQUEST_DENIED',
	INVALID_REQUEST = 'INVALID_REQUEST',
	UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export enum GeoAddressType {
	STREET_ADDRESS = 'street_address',
	ROUTE = 'route',
	INTERSECTION = 'intersection',
	POLITICAL = 'political',
	COUNTRY = 'country',
	ADMINISTRATIVE_AREA_LEVEL_1 = 'administrative_area_level_1',
	ADMINISTRATIVE_AREA_LEVEL_2 = 'administrative_area_level_2',
	ADMINISTRATIVE_AREA_LEVEL_3 = 'administrative_area_level_3',
	ADMINISTRATIVE_AREA_LEVEL_4 = 'administrative_area_level_4',
	ADMINISTRATIVE_AREA_LEVEL_5 = 'administrative_area_level_5',
	ADMINISTRATIVE_AREA_LEVEL_6 = 'administrative_area_level_6',
	ADMINISTRATIVE_AREA_LEVEL_7 = 'administrative_area_level_7',
	COLLOQUIAL_AREA = 'colloquial_area',
	LOCALITY = 'locality',
	SUBLOCALITY = 'sublocality',
	NEIGHBORHOOD = 'neighborhood',
	PREMISE = 'premise',
	SUBPREMISE = 'subpremise',
	PLUS_CODE = 'plus_code',
	POSTAL_CODE = 'postal_code',
	POSTAL_CODE_PREFIX = 'postal_code_prefix',
	NATURAL_FEATURE = 'natural_feature',
	AIRPORT = 'airport',
	PARK = 'park',
	POINT_OF_INTEREST = 'point_of_interest',
}

export enum GeoAddressComponentType {
	FLOOR = 'floor',
	ESTABLISHMENT = 'establishment',
	LANDMARK = 'landmark',
	PARKING = 'parking',
	POST_BOX = 'post_box',
	POSTAL_TOWN = 'postal_town',
	ROOM = 'room',
	STREET_NUMBER = 'street_number',
	BUS_STATION = 'bus_station',
	TRAIN_STATION = 'train_station',
	TRANSIT_STATION = 'transit_station',
}

export enum GeoLocationType {
	ROOFTOP = 'ROOFTOP',
	RANGE_INTERPOLATED = 'RANGE_INTERPOLATED',
	GEOMETRIC_CENTER = 'GEOMETRIC_CENTER',
	APPROXIMATE = 'APPROXIMATE',
}

export interface GeoAddressComponent {
	long_name: string;
	short_name: string;
	types: (GeoAddressComponentType | GeoAddressType)[];
}

export interface GeoBoundsInfo {
	northeast: LatLngLiteral;
	southwest: LatLngLiteral;
}

export interface GeoGeometryInfo {
	location: LatLngLiteral;
	location_type: GeoLocationType;
	viewport: GeoBoundsInfo;
	bounds?: GeoBoundsInfo;
}

export interface GeoPlusCodeInfo {
	global_code: string;
	compound_code: string;
}

export interface GeoMatchInfo {
	endOffset: number;
}

export interface GeoTextInfo {
	text: string;
	matches: GeoMatchInfo[];
}

export interface GeocodeDto {
	address_components: GeoAddressComponent[];
	formatted_address: string;
	geometry: GeoGeometryInfo;
	plus_code?: GeoPlusCodeInfo;
	partial_match?: boolean;
	place_id: string;
	types: GeoAddressType[];
}

export interface PlacePredictionDto {
	place: string;
	placeId: string;
	text: GeoTextInfo;
	structuredFormat: {
		mainText: GeoTextInfo;
	};
	types: GeoAddressType[];
}

export type GeoSuggestion = {
	placePrediction: PlacePredictionDto;
};

export interface GeocodeResponse {
	results: GeocodeDto[];
	status: GeoStatusCode;
}

export interface AutocompleteResponse {
	suggestions: GeoSuggestion[];
}
