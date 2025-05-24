export {
    addStop,
    addTrip,
    removeStop,
    removeTrip,
    editTrip,
    editStop,
    tripsSlice,
    setTrips,
    setStops,
    default as tripsReducer
} from "./model/tripsSlice";
export {
    selectTrips
} from "./model/selectors";
export { createTrip } from "./model/createTrip";