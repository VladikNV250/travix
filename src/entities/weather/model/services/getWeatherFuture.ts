import { formatDate } from 'shared/lib';

import { weatherApi } from '../../api';
import { mapWeatherDtoToWeather } from '../mappers/mapWeatherDtoToWeather';

export const getWeatherFuture = async (query: string, date: Date) => {
	const formattedDate = formatDate(date, 'yyyy-mm-dd');
	const forecastdays = await weatherApi.fetchWeatherFuture(
		query,
		formattedDate,
	);

	return forecastdays.length > 0
		? mapWeatherDtoToWeather(forecastdays[0])
		: null;
};
