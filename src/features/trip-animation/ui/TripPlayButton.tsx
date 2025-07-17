import { FC } from 'react';

import { LatLngExpression } from 'leaflet';

import {
	useTripAnimator,
	useTripAnimatorPlayer,
} from 'features/trip-animation/lib';
import { PauseIcon, PlayIcon } from 'shared/assets';

interface TripPlayButtonProps {
	stops: LatLngExpression[];
}

export const TripPlayButton: FC<TripPlayButtonProps> = ({ stops }) => {
	const { tripAnimator } = useTripAnimator();
	const [playState, handlePlayClick] = useTripAnimatorPlayer(tripAnimator);

	return (
		<button onClick={() => handlePlayClick(stops)}>
			{playState === 'playing' ? (
				<PauseIcon
					width={20}
					height={20}
				/>
			) : (
				<PlayIcon
					width={20}
					height={20}
				/>
			)}
		</button>
	);
};
