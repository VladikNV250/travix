import { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

import { Prediction, getPredictions } from 'entities/geo';

/**
 * Implements address autocomplete functionality.
 * Handles debounced API calls and manages prediction results.
 *
 * TODO: Rewrite this logic to separate feature
 */
export const useStopFormPredictions = (address: string) => {
	const [debouncedAddress] = useDebounce(address, 400);
	const [predictions, setPredictions] = useState<Prediction[]>([]);

	// TODO: rewrite it using react-query
	useEffect(() => {
		(async () => {
			if (debouncedAddress !== '') {
				const predictions = await getPredictions(debouncedAddress);
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
