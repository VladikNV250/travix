import { apiClient } from 'shared/api';

import { APIAutocomplete, Prediction } from './types';

export const autocompletePlace = async (
	input: string,
): Promise<Prediction[]> => {
	const response = await apiClient.get<APIAutocomplete>(
		'/api/autocomplete-place',
		{
			params: {
				input,
			},
		},
	);

	return response.predictions;
};
