import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.routes
)

export const selectRoute = (id: string) => {
    return createSelector([selectBase], (state) => state.routes[id])
}

export const selectActiveRoute = createSelector(
    selectBase,
    (state) => state.activeRouteId
)

export const selectCurrentStop = createSelector(
    selectBase,
    (state) => state.currentMarkerStop,
)