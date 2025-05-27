import { Image } from "entities/image";
import { LatLngExpression } from "leaflet";

export interface Stop {
    readonly id: string;
    address: string;
    location: LatLngExpression;
    countryCode: string | null;
    arrivalDate: string;
    departureDate: string;
    notes?: string;
    images: Image[];
}