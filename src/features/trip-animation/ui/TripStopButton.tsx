import { FC } from 'react';

import { useTripAnimator } from 'features/trip-animation/lib';
import { StopIcon } from 'shared/assets';

export const TripStopButton: FC = () => {
	const { tripAnimator } = useTripAnimator();

	return (
		<button onClick={() => tripAnimator?.stopAnimation()}>
			<StopIcon
				width={20}
				height={20}
			/>
		</button>
	);
};
