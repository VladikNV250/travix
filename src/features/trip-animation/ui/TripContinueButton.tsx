import { FC } from 'react';

import { useTripAnimator } from 'features/trip-animation/lib';

export const TripContinueButton: FC = () => {
	const { tripAnimator } = useTripAnimator();

	return (
		<button
			className="rounded bg-lime-500 px-5 py-3 text-xl font-medium text-neutral-50 hover:bg-lime-600"
			onClick={() => tripAnimator?.continueAnimation()}
		>
			Continue Trip
		</button>
	);
};
