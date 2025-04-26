import { apiClient } from "shared/api"
import { IAPIGeocode, Location } from "./types";

export const geocodePlace = async (place: string): Promise<Location> => {
    const response = await apiClient.get<IAPIGeocode>("/api/geocode", {
        params: {
            address: place
        }
    })

    return response.results[0]?.geometry.location;
}