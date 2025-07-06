import { useContext } from 'react';

import { MapContext } from './contextMap';

export const useMap = () => {
	const context = useContext(MapContext);
	if (!context) throw new Error('useMap must be used within MapProvider');
	return context;
};
