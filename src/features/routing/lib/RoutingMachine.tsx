import { useMap } from "features/map";
import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import * as L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface IRoutingMachine {
    waypoints: LatLngExpression[];
    color: string;
}

export const RoutingMachine = ({ waypoints, color }: IRoutingMachine) => {
    const { map } = useMap();

    useEffect(() => {
        if (!map) return;

        // @ts-expect-error Because Leaflet Routing Machine doesn't have own types. And Routing is not in L, but it exists.
        const control = L.Routing.control({
            waypoints: waypoints,
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            routeWhileDragging: false,
            lineOptions: {
                styles: [
                    {color: 'black', opacity: 0.15, weight: 9}, 
                    {color: 'white', opacity: 0.8,  weight: 6}, 
                    {color: color,   opacity: 1,    weight: 2},
                ]
            },
            createMarker: () => null, 
        }).addTo(map);

        return () => {
            map.removeControl(control);
        }
    }, [map, waypoints])

    return null;
}