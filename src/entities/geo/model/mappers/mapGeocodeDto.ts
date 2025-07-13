import { GeoAddressType, GeocodeDto } from 'entities/geo/api';

import { Geocode } from '../types';

export const mapGeocodeDto = (geocodeDto: GeocodeDto): Geocode => {
	const countryAddressComponent = geocodeDto.address_components.find(
		component => component.types.includes(GeoAddressType.COUNTRY),
	);

	return {
		location: geocodeDto.geometry.location,
		countryCode: countryAddressComponent?.short_name || null,
	};
};
