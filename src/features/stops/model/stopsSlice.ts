import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StopsState } from "./types";
import { Stop } from "entities/stop";

const initialState: StopsState = {
    stops: []
}

export const stopsSlice = createSlice({
    name: "stops",
    initialState,
    reducers: {
        addStop: (state, action: PayloadAction<Stop>) => {
            state.stops.push(action.payload);
        },
        removeStop: (state, action: PayloadAction<Stop>) => {
            state.stops = state.stops.filter(stop => stop.id !== action.payload.id);
        }
    }
})

export const { addStop, removeStop } = stopsSlice.actions;
export default stopsSlice.reducer;