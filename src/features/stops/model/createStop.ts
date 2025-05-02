import { Stop, validateStop } from "entities/stop";
import { geocodePlace } from "features/geo";

export const createStop = async (data: Partial<Stop>): Promise<Stop | null> => {
    const stop: Stop = {
        id: new Date().getTime().toString(),
        address: data.address ?? "",
        location: data.location ?? {
            lat: 0,
            lng: 0,
        },
        arrivalDate: data.arrivalDate ?? "",
        departureDate: data.departureDate ?? "",
        notes: data.notes,
    }

    if (!validateStop(stop)) return null;
    
    stop.location = await geocodePlace(stop.address);

    return stop;
}