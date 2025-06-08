import { Stop } from "entities/stop";
import { LatLng } from "leaflet";

export interface Trip {
    readonly id: string;
    name: string,
    color: string,
    stops: Stop[],
    route: LatLng[] 
}