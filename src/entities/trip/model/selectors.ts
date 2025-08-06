import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

import { TripsState } from './types';

const selectBase = createSelector(
	(state: RootState) => state,
	state => state.trips,
);

export const selectTrips = createSelector(
	[selectBase],
	(state: TripsState) => state.trips,
);

export const selectTrip = (tripId: string | undefined) =>
	createSelector([selectTrips], trips =>
		trips.find(trip => trip.id === tripId),
	);
