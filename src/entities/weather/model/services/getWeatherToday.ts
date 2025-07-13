import { mapWeatherDto } from '../mappers';

import { weatherApi } from '../../api';

export const getWeatherToday = async (query: string) => {
	const response = await weatherApi.fetchWeatherCurrent(query);

	if (response) {
		return mapWeatherDto(response);
	}
	return null;
};
