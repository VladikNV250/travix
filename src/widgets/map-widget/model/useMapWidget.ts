import { Map } from 'leaflet';

import { useMap } from 'features/map';

import { useMapMarkers } from './useMapMarkers';
import { useMapRoutes } from './useMapRoutes';

export const useMapWidget = () => {
	const { setMap } = useMap();

	const onMapLoad = (mapInstance: Map) => {
		setMap(mapInstance);
	};

	const markers = useMapMarkers();
	const routes = useMapRoutes();

	return {
		markers,
		routes,
		onMapLoad,
	};
};
