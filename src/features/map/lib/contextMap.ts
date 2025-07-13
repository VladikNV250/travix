import { createContext } from 'react';

import { Map } from 'leaflet';

interface MapContext {
	map: Map | null;
	setMap: (map: Map) => void;
}

export const MapContext = createContext<MapContext>(null!);
