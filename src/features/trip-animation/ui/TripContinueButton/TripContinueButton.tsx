import { FC } from 'react';

import { useTripAnimator } from 'features/trip-animation/lib';

import styles from './style.module.scss';

export const TripContinueButton: FC = () => {
	const { tripAnimator } = useTripAnimator();

	return (
		<button
			className={styles.button}
			onClick={() => tripAnimator?.continueAnimation()}
		>
			Continue Trip
		</button>
	);
};
