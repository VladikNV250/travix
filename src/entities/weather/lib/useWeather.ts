import { useCallback, useState } from 'react';

import {
	getWeatherForecast,
	getWeatherFuture,
	getWeatherToday,
} from '../api/weatherApi';
import { Weather } from '../model/types';

export const useWeather = () => {
	const [weather, setWeather] = useState<Weather | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<unknown | null>(null);

	const getWeather = useCallback(async (latlng: string, date: Date) => {
		const day = 1000 * 60 * 60 * 24;
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		try {
			setLoading(true);

			if (
				date.getTime() - today.getTime() >= 0 &&
				date.getTime() - today.getTime() <= day
			) {
				setWeather(await getWeatherToday(latlng));
			} else if (
				date.getTime() - today.getTime() >= 0 &&
				date.getTime() - today.getTime() <= 14 * day
			) {
				setWeather(await getWeatherForecast(latlng, date));
			} else if (
				date.getTime() - today.getTime() > 14 * day &&
				date.getTime() - today.getTime() <= 300 * day
			) {
				setWeather(await getWeatherFuture(latlng, date));
			} else {
				setWeather(null);
			}
		} catch (e) {
			console.error('WEATHER-API-ERROR', e);
			setError(e);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		weather,
		loading,
		error,
		getWeather,
	};
};
