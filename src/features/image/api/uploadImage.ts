import { apiClient } from "shared/api"
import { UploadApiResponse } from "./type";
import { Image } from "entities/stop/image";

export const uploadImage = async (
    data: FormData, 
): Promise<Image> => {
    const response = await apiClient.post<UploadApiResponse>("https://api.imgbb.com/1/upload", data, {
        params: {
            key: "ceb57b63cdbefbb2983f6067e26a4c6e"
        }
    });
    const image: Image = {
        url: response.data.url,
        id: response.data.id,
    }

    return image;
}