import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { StopsState } from "./types";

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.stops,
)

export const selectStops = createSelector(
    selectBase,
    (state: StopsState) => state.stops
)