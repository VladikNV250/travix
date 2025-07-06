import { useContext } from 'react';

import { TripAnimatorContext } from '../context';

export const useTripAnimator = () => {
	const context = useContext(TripAnimatorContext);
	if (!context) {
		throw new Error(
			'useTripAnimatorContext must be used within a TripAnimatorProvider',
		);
	}
	return context;
};
