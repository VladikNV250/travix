import { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

import { Prediction, autocompletePlace } from 'features/geo';

interface UseStopFormPredictionsProps {
	address: string;
}

interface UseStopFormPredictionsResult {
	predictions: Prediction[];
}

/**
 * Implements address autocomplete functionality.
 * Handles debounced API calls and manages prediction results.
 */
export const useStopFormPredictions = ({
	address,
}: UseStopFormPredictionsProps): UseStopFormPredictionsResult => {
	const [debouncedAddress] = useDebounce(address, 400);
	const [predictions, setPredictions] = useState<Prediction[]>([]);

	useEffect(() => {
		(async () => {
			if (debouncedAddress !== '') {
				const predictions = await autocompletePlace(debouncedAddress);
				setPredictions(predictions);
			} else {
				setPredictions([]);
			}
		})();
	}, [debouncedAddress]);

	return {
		predictions,
	};
};
