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
        countryCode: null,
        arrivalDate: data.arrivalDate ?? "",
        departureDate: data.departureDate ?? "",
        notes: data.notes,
        images: data.images ?? [],
    }

    if (!validateStop(stop)) return null;
    
    const geocode = await geocodePlace(stop.address);

    stop.location = geocode.location;
    stop.countryCode = geocode.countryCode;

    return stop;
}