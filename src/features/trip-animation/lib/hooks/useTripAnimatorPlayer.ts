import { useEffect, useState } from 'react';

import { LatLngExpression } from 'leaflet';

import { setCurrentMarkerStop } from 'features/routing';
import { useAppDispatch } from 'shared/lib';

import { TripAnimator } from '../TripAnimator';

export const useTripAnimatorPlayer = (tripAnimator: TripAnimator | null) => {
	const dispatch = useAppDispatch();
	const [playState, setPlayState] = useState<
		'idle' | 'playing' | 'paused' | 'finished'
	>('idle');

	useEffect(() => {
		if (!tripAnimator) return;

		tripAnimator.onAnimationEnd = () => {
			dispatch(setCurrentMarkerStop(null));
			setPlayState('finished');
		};

		return () => {
			tripAnimator.onAnimationEnd = undefined;
		};
	}, [dispatch, tripAnimator]);

	const handlePlayClick = (stops: LatLngExpression[]) => {
		if (!tripAnimator) return;

		if (playState === 'idle' || playState === 'finished') {
			tripAnimator.startAnimation(stops);
			setPlayState('playing');
		} else if (playState === 'playing') {
			tripAnimator.pauseAnimation();
			setPlayState('paused');
		} else if (playState === 'paused') {
			tripAnimator.continueAnimation();
			setPlayState('playing');
		}
	};

	return [playState, handlePlayClick] as const;
};
