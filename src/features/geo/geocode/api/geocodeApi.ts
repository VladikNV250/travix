import { apiClient } from 'shared/api';

import { APIGeocode, GeocodePlaceReturn } from './types';

export const geocodePlace = async (
	place: string,
): Promise<GeocodePlaceReturn> => {
	const response = await apiClient.get<APIGeocode>('/api/geocode', {
		params: {
			address: place,
		},
	});

	let countryCode: string | null = null;
	response.results[0]?.address_components.forEach(address => {
		const isCountryAddress = Boolean(
			address.types.find(type => type === 'country'),
		);

		if (isCountryAddress) {
			countryCode = address.short_name;
		}
	});

	return {
		location: response.results[0]?.geometry.location,
		countryCode,
	};
};
