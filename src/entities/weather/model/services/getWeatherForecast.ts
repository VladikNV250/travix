import { mapWeatherDto } from '../mappers';

import { weatherApi } from '../../api';

export const getWeatherForecast = async (query: string, date: Date) => {
	const dayMs = 1 * 24 * 60 * 60 * 1000;
	const today = new Date();

	const days = Math.ceil((date.getTime() - today.getTime()) / dayMs) + 1; // +1 because the current day is also included in the forecast
	const forecastdays = await weatherApi.fetchWeatherForecast(query, days);

	return forecastdays.length > 0 ? mapWeatherDto(forecastdays[0]) : null;
};
