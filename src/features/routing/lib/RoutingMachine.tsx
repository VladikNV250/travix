import { useEffect, useMemo } from 'react';

import * as Lf from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import { Trip } from 'entities/trip';
import { useMap } from 'features/map';
import { useAppDispatch } from 'shared/lib';

import { addRoute } from '../model/routesSlice';

interface IRoutingMachine {
	trip: Trip;
}

export const RoutingMachine = ({ trip }: IRoutingMachine) => {
	const dispatch = useAppDispatch();
	const { map } = useMap();

	const waypoints = useMemo(
		() => trip.stops.map(stop => Lf.latLng(stop.location)),
		[trip.stops],
	);

	useEffect(() => {
		if (!map) return;

		// TODO: resolve this problem with types.
		// @ts-expect-error Because Leaflet Routing Machine doesn't have own types. And Routing is not in Lf, but it exists.
		const control: Lf.Control<Lf.ControlOptions> = Lf.Routing.control({
			waypoints: waypoints,
			show: false,
			addWaypoints: false,
			draggableWaypoints: false,
			fitSelectedRoutes: false,
			routeWhileDragging: false,
			lineOptions: {
				styles: [
					{ color: 'black', opacity: 0.15, weight: 9 },
					// {color: 'black', opacity: 0, weight: 9},
					{ color: 'white', opacity: 0.8, weight: 6 },
					// {color: 'white', opacity: 0,  weight: 6},
					{ color: trip.color, opacity: 1, weight: 2 },
					// {color: trip.color,   opacity: 0,    weight: 2},
				],
			},
			createMarker: () => null,
		})
			.addTo(map)
			.off('routesfound')
			// TODO: make types for this.
			// @ts-expect-error because event doesn't have type
			.on('routesfound', async e => {
				const route = e.routes[0];
				const coordinates: Lf.LatLng[] = route.coordinates;

				dispatch(
					addRoute({
						id: trip.id,
						coordinates,
					}),
				);
			});

		return () => {
			map.removeControl(control);
		};
	}, [map, waypoints, trip, dispatch]);

	return null;
};
