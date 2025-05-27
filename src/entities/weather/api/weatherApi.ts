import { apiClient } from "shared/api"
import { ApiForecastResponse, ApiTodayResponse } from "./types"
import { formatDate } from "shared/lib"
import { Weather } from "../model/types"

/** Get weather data for today */
export const getWeatherToday = async (query: string): Promise<Weather> => { 
    const response = await apiClient.get<ApiTodayResponse>("/api/weather/today", {
        params: {
            query
        }
    })

    const weather: Weather = {
        temperature: response.current.temp_c,
        condition: response.current.condition.text,
        icon: response.current.condition.icon,
    }

    return weather;
}

/** Get weather data for the next 14 days */
export const getWeatherForecast = async (query: string, date: Date): Promise<Weather | null> => { 
    const dayMs = 1000 * 60 * 60 * 24;
    const today = new Date();

    const days = Math.ceil((date.getTime() - today.getTime()) / dayMs) + 1; // +1 because the current day is also included in the forecast
    
    const response = await apiClient.get<ApiForecastResponse>("/api/weather/forecast", {
        params: {
            query,
            days,
        }
    })

    const forecastDay = response.forecast.forecastday.find(forecastDay => {
        return forecastDay.date === formatDate(date, "yyyy-mm-dd");
    });

    if (forecastDay) {
        return {
            condition: forecastDay.day.condition.text,
            icon: forecastDay.day.condition.icon,
            temperature: forecastDay.day.maxtemp_c,
        }
    } else {
        return null;
    }
}

/** Get weather data for a date from 14 days to 300 days from today in the future. */
export const getWeatherFuture = async (query: string, date: Date): Promise<Weather | null> => {
    const response = await apiClient.get<ApiForecastResponse>("/api/weather/future", {
        params: {
            query,
            date: formatDate(date, "yyyy-mm-dd"),
        }
    })

    const day = response.forecast.forecastday[0]?.day;

    if (day) {
        return {
            condition: day.condition.text,
            icon: day.condition.icon,
            temperature: day.maxtemp_c,
        };
    } else {
        return null;
    }
}