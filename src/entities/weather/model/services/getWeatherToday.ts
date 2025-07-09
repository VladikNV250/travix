import { weatherApi } from '../../api';
import { mapWeatherDtoToWeather } from '../mappers/mapWeatherDtoToWeather';

export const getWeatherToday = async (query: string) => {
	const response = await weatherApi.fetchWeatherCurrent(query);

	if (response) {
		return mapWeatherDtoToWeather(response);
	}
	return null;
};
