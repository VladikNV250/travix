import { renderToString } from 'react-dom/server';

import { DivIcon } from 'leaflet';

import { PointIcon } from 'shared/assets';

export const createMarkerIcon = (color: string): DivIcon => {
	return new DivIcon({
		html: renderToString(
			<PointIcon
				width={20}
				height={20}
				style={{ color, zIndex: -1 }}
			/>,
		),
		iconSize: [20, 20],
		className: 'bg-transparent border-none',
	});
};
