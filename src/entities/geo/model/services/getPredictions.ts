import { mapPredictionDto } from '../mappers/mapPredictionDto';
import { geoApi } from 'entities/geo/api';

export const getPredictions = async (input: string) => {
	const suggestions = await geoApi.autocompletePlace(input);

	return suggestions.map(suggestion =>
		mapPredictionDto(suggestion.placePrediction),
	);
};
