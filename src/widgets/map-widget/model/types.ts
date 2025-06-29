import { Stop } from "entities/stop";
import { Trip } from "entities/trip";
import { DivIcon, LatLngExpression, Map } from "leaflet";

export interface IMapViewModel {
    initialCenter: LatLngExpression;
    initialZoom: number;
    markers: MapMarkerData[];
    routes: MapRouteData[];
    onMapLoad: (mapInstance: Map) => void;
}

export interface MapRouteData {
    readonly key: string;
    trip: Trip
}

export interface MapMarkerData {
    readonly key: string;
    stop: Stop;
    icon: DivIcon;
}