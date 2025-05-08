import { apiClient } from "shared/api"
import { APIGeocode } from "./types";
import { LatLngExpression } from "leaflet";

export const geocodePlace = async (place: string): Promise<LatLngExpression> => {
    const response = await apiClient.get<APIGeocode>("/api/geocode", {
        params: {
            address: place
        }
    })

    return response.results[0]?.geometry.location;
}