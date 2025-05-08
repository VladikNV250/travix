import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripsState } from "./types";
import { Trip } from "entities/trip";
import { Stop } from "entities/stop";

const initialState: TripsState = {
    trips: [],
};

export const tripsSlice = createSlice({
    name: "trips",
    initialState,
    reducers: {
        addTrip: (state, action: PayloadAction<Trip>) => {
            state.trips.push(action.payload);
        },
        removeTrip: (state, action: PayloadAction<Trip | null>) => {
            if (action.payload) {
                state.trips = state.trips.filter(
                    (trip) => trip.id !== action.payload?.id
                );
            }
        },
        editTrip: (state, action: PayloadAction<Trip>) => {
            const trip = state.trips.find(trip => trip.id === action.payload.id);

            if (trip) {
                Object.assign(trip, action.payload);
            }
        },
        addStop: (state, action: PayloadAction<{ tripId: Trip["id"], stop: Stop }>) => {
            const { tripId, stop } = action.payload;

            const trip = state.trips.find((trip) => trip.id === tripId);

            if (trip) {
                trip.stops.push(stop);
            }
        },
        removeStop: (state, action: PayloadAction<{ tripId: Trip["id"], stop: Stop }>) => {
            const { tripId, stop } = action.payload;

            const trip = state.trips.find((trip) => trip.id === tripId);

            if (trip) {
                trip.stops = trip.stops.filter(tripStop => tripStop.id !== stop.id);
            }
        },
        editStop: (state, action: PayloadAction<{ tripId: Trip["id"], updatedStop: Stop }>) => {
            const { tripId, updatedStop } = action.payload;

            const trip = state.trips.find(trip => trip.id === tripId);

            if (trip) {
                const stop = trip.stops.find(stop => stop.id === updatedStop.id);
                
                if (stop) {
                    Object.assign(stop, updatedStop);
                }
            }
        }
    },
});

export const { 
    addStop, 
    addTrip, 
    removeStop, 
    removeTrip,
    editStop,
    editTrip,
} = tripsSlice.actions;
export default tripsSlice.reducer;
