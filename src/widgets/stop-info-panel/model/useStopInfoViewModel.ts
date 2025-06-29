import { 
    useEffect, 
    useMemo 
} from "react";
import { latLng } from "leaflet";
import { selectCurrentStop } from "features/routing";
import { useHoliday } from "entities/holidays";
import { useWeather } from "entities/weather";
import { formatDate, useAppSelector } from "shared/lib";
import { extractCityAndRegion } from "../lib";
import { 
    HolidayDisplayData, 
    IStopInfoViewModel, 
    StopInfoData, 
    WeatherDisplayData 
} from "./types";

export const useStopInfoViewModel = (): IStopInfoViewModel => {
    const stop = useAppSelector(selectCurrentStop);
    const { weather, loading: weatherLoading, getWeather } = useWeather();
    const { holiday, loading: holidayLoading, getHoliday } = useHoliday();
    
    const [city, region] = useMemo(
        () => extractCityAndRegion(stop?.address ?? null),
        [stop?.address]
    )
        

    useEffect(() => {
        (async () => {
            if (stop) {
                const stopDate = new Date(stop.arrivalDate || Date.now());
                const latlng = latLng(stop.location);
                const latlngStr = `${latlng.lat},${latlng.lng}`;
                await getWeather(latlngStr, stopDate);

                if (stop.countryCode) {
                    await getHoliday(stop.countryCode, stopDate);
                }
            }
            
        })()
    }, [stop, getWeather, getHoliday]);

    const weatherDisplayData: WeatherDisplayData = useMemo(() => {
        const formattedDate = stop?.arrivalDate ? formatDate(new Date(stop.arrivalDate)) : formatDate(new Date());

        if (weatherLoading) return { type: "loading", date: formattedDate };
        if (weather) {
            return {
                type: "data",
                date: formattedDate,
                data: {
                    ...weather,
                    temperature: Math.floor(weather.temperature) 
                }
            }
        }
        return {
            type: "unavailable",
            date: formattedDate,
            message: "Weather is temporarily unavailable."
        }
    }, [weather, weatherLoading, stop?.arrivalDate]);

    const holidayDispayData: HolidayDisplayData = useMemo(() => {
        if (holidayLoading) return { type: "loading" };
        if (holiday) {
            return {
                type: "data",
                data: holiday
            }
        }
        return {
            type: "unavailable",
            message: "No holidays on this date"
        }
    }, [holiday, holidayLoading]);

    const stopInfoData: StopInfoData | null = useMemo(() => {
        if (!stop) return null;
        return {
            title: city,
            subtitle: region,
            notes: stop.notes || "No notes about this place.",
            images: stop.images || [],
        };
    }, [city, region, stop]);

    return {
        hasStop: !!stop,
        stopInfo: stopInfoData,
        weather: weatherDisplayData,
        holiday: holidayDispayData,
    }
}