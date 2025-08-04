import { AnimationEvent, useState } from 'react';

import { Trip } from 'entities/trip';

export const useVisibleTrip = (trip: Trip | null) => {
	const [visibleTrip, setVisibleTrip] = useState(trip ?? null);

	if (trip && trip.id !== visibleTrip?.id) {
		setVisibleTrip(trip);
	}

	const shouldHide = !trip && visibleTrip;

	const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
		if (shouldHide && event.animationName === 'slide-fade-out') {
			setVisibleTrip(null);
		}
	};

	return {
		visibleTrip,
		handleAnimationEnd,
	};
};
