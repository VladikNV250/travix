import { Location } from "shared/geo";

export interface Stop {
    readonly id: string;
    address: string;
    location: Location;
    arrivalDate: string;
    departureDate: string;
    notes?: string;
}