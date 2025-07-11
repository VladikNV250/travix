import { FC } from 'react';

import { useTripAnimator } from 'features/trip-animation/lib';
import { Stop } from 'shared/assets';

export const TripStopButton: FC = () => {
	const { tripAnimator } = useTripAnimator();

	return (
		<button onClick={() => tripAnimator?.stopAnimation()}>
			<Stop
				width={20}
				height={20}
			/>
		</button>
	);
};
