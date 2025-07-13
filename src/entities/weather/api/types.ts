export interface WeatherLocationDto {
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	tz_id: string;
	localtime_epoch: number;
	localtime: string;
}

export interface WeatherConditionInfo {
	text: string;
	icon: string;
	code: number;
}

export enum WindDirection {
	N = 'N',
	NE = 'NE',
	E = 'E',
	SE = 'SE',
	S = 'S',
	SW = 'SW',
	W = 'W',
	NW = 'NW',
}

export interface WeatherCurrentDto {
	last_updated_epoch: number;
	last_updated: string;
	temp_c: number;
	temp_f: number;
	is_day: number; // 1 - Yes, 0 - No
	condition: WeatherConditionInfo;
	wind_mph: number;
	wind_kph: number;
	wind_degree: number;
	wind_dir: WindDirection;
	pressure_mb: number;
	pressure_in: number;
	precip_mm: number;
	precip_in: number;
	humidity: number;
	cloud: number;
	feelslike_c: number;
	feelslike_f: number;
	windchill_c: number;
	windchill_f: number;
	heatindex_c: number;
	heatindex_f: number;
	dewpoint_c: number;
	dewpoint_f: number;
	vis_km: number;
	vis_miles: number;
	uv: number;
	gust_mph: number;
	gust_kph: number;
}

export interface WeatherDayInfo {
	maxtemp_c: number;
	maxtemp_f: number;
	mintemp_c: number;
	mintemp_f: number;
	avgtemp_c: number;
	avgtemp_f: number;
	maxwind_mph: number;
	maxwind_kph: number;
	totalprecip_mm: number;
	totalprecip_in: number;
	totalsnow_cm: number;
	avgvis_km: number;
	avgvis_miles: number;
	avghumidity: number;
	daily_will_it_rain: number;
	daily_chance_of_rain: number;
	daily_will_it_snow: number;
	daily_chance_of_snow: number;
	condition: WeatherConditionInfo;
	uv: number;
}

export interface WeatherAstoInfo {
	sunrise: string;
	sunset: string;
	moonrise: string;
	moonset: string;
	moon_phase: string;
	moon_illumination: number;
	is_moon_up: number; // 1 - Yes, 0 - No
	is_sun_up: number; // 1 - Yes, 0 - No
}

export interface WeatherHourInfo {
	time_epoch: number;
	time: string;
	temp_c: number;
	temp_f: number;
	is_day: number;
	condition: WeatherConditionInfo;
	wind_mph: number;
	wind_kph: number;
	wind_degree: number;
	wind_dir: WindDirection;
	pressure_mb: number;
	pressure_in: number;
	precip_mm: number;
	precip_in: number;
	snow_cm: number;
	humidity: number;
	cloud: number;
	feelslike_c: number;
	feelslike_f: number;
	windchill_c: number;
	windchill_f: number;
	heatindex_c: number;
	heatindex_f: number;
	dewpoint_c: number;
	dewpoint_f: number;
	will_it_rain: number;
	chance_of_rain: number;
	will_it_snow: number;
	chance_of_snow: number;
	vis_km: number;
	vis_miles: number;
	gust_mph: number;
	gust_kph: number;
	uv: number;
}

export interface WeatherForecastdayDto {
	date: string;
	date_epoch: number;
	day: WeatherDayInfo;
	astro: WeatherAstoInfo;
	hour: WeatherHourInfo[];
}

export interface WeatherApi {
	location: WeatherLocationDto;
}

export interface WeatherCurrentResponse extends WeatherApi {
	current: WeatherCurrentDto;
}

export interface WeatherForecastResponse extends WeatherApi {
	current: WeatherCurrentDto;
	forecast: {
		forecastday: WeatherForecastdayDto[];
	};
}

export type WeatherFutureResponse = WeatherForecastResponse;
