import { apiClient } from "shared/api"
import { APIGeocode } from "./types";
import { Location } from "shared/geo";

export const geocodePlace = async (place: string): Promise<Location> => {
    const response = await apiClient.get<APIGeocode>("/api/geocode", {
        params: {
            address: place
        }
    })

    return response.results[0]?.geometry.location;
}