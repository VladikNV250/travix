import { FC, ReactNode, useState } from 'react';

import { TripAnimator } from '../TripAnimator';
import { TripAnimatorContext } from './contextTripAnimator';

interface TripAnimatorProvider {
	children: ReactNode;
}

export const TripAnimatorProvider: FC<TripAnimatorProvider> = ({
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
