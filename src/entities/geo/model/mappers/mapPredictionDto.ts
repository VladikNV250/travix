import { PlacePredictionDto } from 'entities/geo/api';

import { Prediction } from '../types';

export const mapPredictionDto = (
	predictionDto: PlacePredictionDto,
): Prediction => ({
	text: predictionDto.text.text,
	id: predictionDto.placeId,
});
