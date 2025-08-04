import { latLng } from 'leaflet';

import { Stop } from 'entities/stop';

export const calculateDistance = (stops: Stop[]) => {
	const totalDistance =
		stops.slice(0, -1).reduce((total, stop, index) => {
			const nextStop = stops[index + 1];
			return (
				total +
				(nextStop ? latLng(stop.location).distanceTo(nextStop.location) : 0)
			);
		}, 0) ?? 0;

	return Math.round(totalDistance / 1000) + 'km';
};
