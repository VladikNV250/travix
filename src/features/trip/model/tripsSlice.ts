import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';

import { TripsState } from './types';

const initialState: TripsState = {
	trips: [],
};

export const tripsSlice = createSlice({
	name: 'trips',
	initialState,
	reducers: {
		setTrips: (state, action: PayloadAction<Trip[]>) => {
			state.trips = action.payload;
		},
		addTrip: (state, action: PayloadAction<Trip>) => {
			state.trips.push(action.payload);
		},
		removeTrip: (state, action: PayloadAction<Trip | null>) => {
			if (action.payload) {
				state.trips = state.trips.filter(
					trip => trip.id !== action.payload?.id,
				);
			}
		},
		editTrip: (state, action: PayloadAction<Trip>) => {
			const trip = state.trips.find(trip => trip.id === action.payload.id);

			if (trip) {
				Object.assign(trip, action.payload);
			}
		},
		setStops: (
			state,
			action: PayloadAction<{ tripId: Trip['id']; stops: Stop[] }>,
		) => {
			const { tripId, stops } = action.payload;

			const trip = state.trips.find(trip => trip.id === tripId);

			if (trip) {
				trip.stops = stops;
			}
		},
		addStop: (
			state,
			action: PayloadAction<{ tripId: Trip['id']; stop: Stop }>,
		) => {
			const { tripId, stop } = action.payload;

			const trip = state.trips.find(trip => trip.id === tripId);

			if (trip) {
				trip.stops.push(stop);
			}
		},
		removeStop: (
			state,
			action: PayloadAction<{ tripId: Trip['id']; stop: Stop }>,
		) => {
			const { tripId, stop } = action.payload;

			const trip = state.trips.find(trip => trip.id === tripId);

			if (trip) {
				trip.stops = trip.stops.filter(tripStop => tripStop.id !== stop.id);
			}
		},
		editStop: (
			state,
			action: PayloadAction<{ tripId: Trip['id']; updatedStop: Stop }>,
		) => {
			const { tripId, updatedStop } = action.payload;

			const trip = state.trips.find(trip => trip.id === tripId);

			if (trip) {
				const stop = trip.stops.find(stop => stop.id === updatedStop.id);

				if (stop) {
					Object.assign(stop, updatedStop);
				}
			}
		},
	},
});

export const {
	setTrips,
	setStops,
	addStop,
	addTrip,
	removeStop,
	removeTrip,
	editStop,
	editTrip,
} = tripsSlice.actions;
export default tripsSlice.reducer;
