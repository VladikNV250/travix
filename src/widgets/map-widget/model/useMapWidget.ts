import { useCallback } from 'react';

import { Map } from 'leaflet';

import { useMap } from 'features/map';

import { MapMarkerData, MapRouteData } from './types';
import { useMapMarkers } from './useMapMarkers';
import { useMapRoutes } from './useMapRoutes';

export interface UseMapWidgetResult {
	markers: MapMarkerData[];
	routes: MapRouteData[];
	onMapLoad: (mapInstance: Map) => void;
}

export const useMapWidget = (): UseMapWidgetResult => {
	const { setMap } = useMap();

	const onMapLoad = useCallback(
		(mapInstance: Map) => {
			setMap(mapInstance);
		},
		[setMap],
	);

	const markers = useMapMarkers();
	const routes = useMapRoutes();

	return {
		markers,
		routes,
		onMapLoad,
	};
};
