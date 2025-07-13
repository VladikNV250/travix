import { mapWeatherDto } from '../mappers';
import { DAY_MS } from 'entities/weather/config';

import { weatherApi } from '../../api';

export const getWeatherForecast = async (query: string, date: Date) => {
	const today = new Date();

	const days = Math.ceil((date.getTime() - today.getTime()) / DAY_MS) + 1; // +1 because the current day is also included in the forecast
	const forecastdays = await weatherApi.fetchWeatherForecast(query, days);

	return forecastdays.length > 0 ? mapWeatherDto(forecastdays[0]) : null;
};
