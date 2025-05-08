import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { TripsState } from "./types";

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.trips
)

export const selectTrips = createSelector(
    selectBase,
    (state: TripsState) => state.trips,
)