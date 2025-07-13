import { apiClient } from 'shared/api';

import {
	AutocompleteResponse,
	GeoStatusCode,
	GeoSuggestion,
	GeocodeDto,
	GeocodeResponse,
} from './types';

export const geoApi = {
	geocodePlace: async (place: string): Promise<GeocodeDto[]> => {
		const response = await apiClient.get<GeocodeResponse>('/api/geocode', {
			params: {
				address: place,
			},
		});

		if (response.status === GeoStatusCode.OK) {
			return response.results;
		}

		throw new Error(`Geo api error. Status: ${response.status}`);
	},
	autocompletePlace: async (input: string): Promise<GeoSuggestion[]> => {
		const response = await apiClient.get<AutocompleteResponse>(
			'/api/autocomplete-place',
			{
				params: {
					input,
				},
			},
		);

		return response.suggestions;
	},
};
