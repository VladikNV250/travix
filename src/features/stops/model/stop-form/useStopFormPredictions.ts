import { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

import { Prediction, autocompletePlace } from 'features/geo';

/**
 * Implements address autocomplete functionality.
 * Handles debounced API calls and manages prediction results.
 */
export const useStopFormPredictions = (address: string) => {
	const [debouncedAddress] = useDebounce(address, 400);
	const [predictions, setPredictions] = useState<Prediction[]>([]);

	// TODO: rewrite it using react-query
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
