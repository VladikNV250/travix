import { Trip, validateTrip } from "entities/trip";

export const createTrip = () => {
    const trip: Trip = {
        id: new Date().getTime().toString(),
        name: "New Trip",
        color: "#ff0000",
        stops: [],
    }

    if (validateTrip(trip)) {
        return trip;
    }
}