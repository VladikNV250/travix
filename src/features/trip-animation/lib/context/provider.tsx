import { FC, ReactNode, useState } from 'react';

import { TripAnimator } from '../TripAnimator';
import { TripAnimatorContext } from './contextTripAnimator';

interface ITripAnimatorProvider {
	children: ReactNode;
}

export const TripAnimatorProvider: FC<ITripAnimatorProvider> = ({
	children,
}) => {
	const [tripAnimator, setTripAnimator] = useState<TripAnimator | null>(null);

	const value = {
		tripAnimator,
		setTripAnimator,
	};

	return (
		<TripAnimatorContext.Provider value={value}>
			{children}
		</TripAnimatorContext.Provider>
	);
};
