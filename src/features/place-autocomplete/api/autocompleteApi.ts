import { apiClient } from "shared/api"
import { IAPIAutocomplete, Prediction } from "./types";

export const autocompletePlace = async (input: string): Promise<Prediction[]> => {
    const response = await apiClient.get<IAPIAutocomplete>("/api/autocomplete-place", {
        params: {
            input
        },
    })

    return response.predictions;
}