import { LatLngExpression, latLng } from 'leaflet';

export const getCoords = (location: LatLngExpression) => {
	const coordinates = latLng(location);
	return `${coordinates.lat},${coordinates.lng}`;
};
