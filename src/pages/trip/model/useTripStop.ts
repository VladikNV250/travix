import { useMemo, useState } from 'react';

import { Trip } from 'entities/trip';

export const useTripStop = (trip?: Trip) => {
	const [dayView, setDayView] = useState(false);

	const displayStops = useMemo(() => {
		if (dayView && trip?.stops) {
			const sortedStops = [...trip.stops];
			sortedStops.sort((stopA, stopB) => {
				const arrivalA = new Date(stopA.arrivalDate);
				const arrivalB = new Date(stopB.arrivalDate);
				return arrivalA.getTime() - arrivalB.getTime();
			});
			return sortedStops;
		}
		return trip?.stops ?? [];
	}, [dayView, trip?.stops]);

	return {
		displayStops,
		dayView,
		toggleDayView: () => setDayView(prev => !prev),
	};
};
