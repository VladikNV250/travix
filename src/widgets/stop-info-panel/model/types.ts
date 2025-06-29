import { Holiday } from "entities/holidays";
import { Image } from "entities/image";
import { Weather } from "entities/weather";

export interface StopInfoData {
    title    : string | null;
    subtitle : string | null;
    notes    : string;
    images   : Image[];
}

interface WeatherLoading { type: "loading"; date: string; }
interface WeatherUnavailable { type: "unavailable"; date: string; message: string }
interface WeatherWithData {
    type: "data",
    date: string,
    data: Weather,
}
export type WeatherDisplayData = WeatherLoading | WeatherUnavailable | WeatherWithData;

interface HolidayLoading { type: "loading" }
interface HolidayUnavailable { type: "unavailable"; message: string }
interface HolidayWithData {
    type: "data",
    data: Holiday,
}
export type HolidayDisplayData = HolidayLoading | HolidayUnavailable | HolidayWithData;


export interface IStopInfoViewModel {
    hasStop  : boolean;
    stopInfo : StopInfoData | null;
    weather  : WeatherDisplayData;
    holiday  : HolidayDisplayData;
}