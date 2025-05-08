import { LatLngExpression } from "leaflet";

export interface Stop {
    readonly id: string;
    address: string;
    location: LatLngExpression;
    arrivalDate: string;
    departureDate: string;
    notes?: string;
}