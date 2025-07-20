import { FC } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

import { RoutingMachine } from 'features/routing';
import { StopMarker } from 'features/stop-details';

import { MAP_INITIAL_CENTER, MAP_INITIAL_ZOOM } from '../config';
import { useMapWidget } from '../model';

export const MapWidget: FC = () => {
	const { markers, routes, onMapLoad } = useMapWidget();

	return (
		<MapContainer
			center={MAP_INITIAL_CENTER}
			zoom={MAP_INITIAL_ZOOM}
			scrollWheelZoom={true}
			style={{ height: '100%', width: '100%', zIndex: '8' }}
			ref={onMapLoad}
		>
			<TileLayer
				crossOrigin="anonymous"
				attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
				url="https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=4ef7271267c746e98ce4774b30eac8fd"
			/>
			{markers.map(marker => (
				<StopMarker
					key={marker.key}
					stop={marker.stop}
					icon={marker.icon}
				/>
			))}
			{routes.map(route => (
				<RoutingMachine
					key={route.key}
					trip={route.trip}
				/>
			))}
		</MapContainer>
	);
};
