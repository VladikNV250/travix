import { FC } from 'react';

import { LatLngExpression } from 'leaflet';

import {
	useTripAnimator,
	useTripAnimatorPlayer,
} from 'features/trip-animation/lib';
import { Pause, Play } from 'shared/assets';

import styles from './style.module.scss';

interface TripPlayButtonProps {
	stops: LatLngExpression[];
}

export const TripPlayButton: FC<TripPlayButtonProps> = ({ stops }) => {
	const { tripAnimator } = useTripAnimator();
	const [playState, handlePlayClick] = useTripAnimatorPlayer(tripAnimator);

	return (
		<button
			onClick={() => handlePlayClick(stops)}
			className={styles.animationButton}
		>
			{playState === 'playing' ? (
				<Pause
					width={20}
					height={20}
				/>
			) : (
				<Play
					width={20}
					height={20}
				/>
			)}
		</button>
	);
};
