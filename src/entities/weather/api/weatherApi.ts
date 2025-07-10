import { apiClient } from 'shared/api';

import {
	WeatherCurrentDto,
	WeatherCurrentResponse,
	WeatherForecastResponse,
	WeatherForecastdayDto,
	WeatherFutureResponse,
} from './types';

export const weatherApi = {
	// Fetch weather data for today
	fetchWeatherCurrent: async (query: string): Promise<WeatherCurrentDto> => {
		const response = await apiClient.get<WeatherCurrentResponse>(
			'/api/weather/today',
			{
				params: {
					query,
				},
			},
		);

		return response.current;
	},

	// Fetch weather data for the next 14 days
	fetchWeatherForecast: async (
		query: string,
		days: number,
	): Promise<WeatherForecastdayDto[]> => {
		if (days > 3) {
			throw new Error('Cannot get weather for more than 3 days from today.');
		}

		const response = await apiClient.get<WeatherForecastResponse>(
			'/api/weather/forecast',
			{
				params: {
					query,
					days,
				},
			},
		);

		return response.forecast.forecastday;
	},

	// Fetch weather data for a date from 14 days to 300 days from today in the future.
	fetchWeatherFuture: async (
		query: string,
		date: string,
	): Promise<WeatherForecastdayDto[]> => {
		const response = await apiClient.get<WeatherFutureResponse>(
			'/api/weather/future',
			{
				params: {
					query,
					date,
				},
			},
		);

		return response.forecast.forecastday;
	},
};
