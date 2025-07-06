import { createContext } from 'react';

import { Map } from 'leaflet';

interface IMapContext {
	map: Map | null;
	setMap: (map: Map) => void;
}

export const MapContext = createContext<IMapContext>(null!);
