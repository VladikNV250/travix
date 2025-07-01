import { renderToString } from 'react-dom/server';

import { DivIcon } from 'leaflet';

import { Point } from 'shared/assets';

import styles from './style.module.scss';

export const createMarkerIcon = (color: string): DivIcon => {
	return new DivIcon({
		html: renderToString(
			<Point
				width={20}
				height={20}
				style={{ color, zIndex: -1 }}
			/>,
		),
		iconSize: [20, 20],
		className: styles.marker,
	});
};
