import { Trip } from "./types";

export const validateTrip = (trip: Trip): boolean => {
    if (trip.name === "") return false;

    return true;
}