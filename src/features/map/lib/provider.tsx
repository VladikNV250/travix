import { FC, ReactNode, useState } from 'react';

import { Map } from 'leaflet';

import { MapContext } from './contextMap';

interface MapProvider {
	children: ReactNode;
}

export const MapProvider: FC<MapProvider> = ({ children }) => {
	const [map, setMap] = useState<Map | null>(null);

	const value = {
		map,
		setMap,
	};

	return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
