import { useCallback } from 'react';

import { Map } from 'leaflet';

import { useMap } from 'features/map';

import { useMapMarkers } from './useMapMarkers';
import { useMapRoutes } from './useMapRoutes';

export const useMapWidget = () => {
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
