import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class APIClient {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: import.meta.env.DEV ? "http://localhost:3001" : "",
            timeout: 7_000,
        })

        this.axios.interceptors.response.use(
            response => response,
            error => {
                console.error("API error: ", error);

                return Promise.reject(error);
            }
        )
    }

    public async get<T>(url: string, config?: AxiosRequestConfig) {
        const { data } = await this.axios.get<T>(url, config); 
        
        return data;
    }
}

export const apiClient = new APIClient();