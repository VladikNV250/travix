import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Route } from 'entities/route';
import { Stop } from 'entities/stop';

import { RoutesState } from './types';

const initialState: RoutesState = {
	routes: {},
	activeRouteId: null,
	currentMarkerStop: null,
};

// TODO: make slice more simple
export const routesSlice = createSlice({
	name: 'routes',
	initialState,
	reducers: {
		addRoute: (state, action: PayloadAction<Route>) => {
			state.routes[action.payload.id] = action.payload;
		},
		removeRoute: (state, action: PayloadAction<Route['id']>) => {
			delete state.routes[action.payload];
		},
		setActiveRouteId: (state, action: PayloadAction<Route['id']>) => {
			state.activeRouteId = action.payload;
		},
		setCurrentMarkerStop: (state, action: PayloadAction<Stop | null>) => {
			state.currentMarkerStop = action.payload;
		},
	},
});

export const { addRoute, removeRoute, setActiveRouteId, setCurrentMarkerStop } =
	routesSlice.actions;
export default routesSlice.reducer;
