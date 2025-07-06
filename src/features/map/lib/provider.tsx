import { FC, ReactNode, useState } from 'react';

import { Map } from 'leaflet';

import { MapContext } from './contextMap';

interface IMapProvider {
	children: ReactNode;
}

export const MapProvider: FC<IMapProvider> = ({ children }) => {
	const [map, setMap] = useState<Map | null>(null);

	const value = {
		map,
		setMap,
	};

	return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
