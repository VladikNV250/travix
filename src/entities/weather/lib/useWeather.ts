import { useCallback, useEffect, useState } from 'react';

import { Stop } from 'entities/stop';
import { getCoords } from 'shared/lib/location';

import { DAY_MS, FORECAST_MAX_DAYS, FUTURE_MAX_DAYS } from '../config';
import {
	getWeatherForecast,
	getWeatherFuture,
	getWeatherToday,
} from '../model';
import { Weather } from '../model/types';

// TODO: maybe rewrite it using react-query
export const useWeather = (defaultStop: Stop | null = null) => {
	const [weather, setWeather] = useState<Weather | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<unknown | null>(null);

	const refetch = useCallback(async (stop: Stop) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const date = new Date(stop.arrivalDate || Date.now());
		const coords = getCoords(stop.location);

		try {
			setLoading(true);
			setError(null);

			if (
				// 0 < date < today
				// TODO: Check the todays weather has this true condition.
				date.getTime() - today.getTime() >= 0 &&
				date.getTime() - today.getTime() <= DAY_MS
			) {
				setWeather(await getWeatherToday(coords));
			} else if (
				// 0 <= date <= 14
				date.getTime() - today.getTime() >= 0 &&
				date.getTime() - today.getTime() <= FORECAST_MAX_DAYS
			) {
				setWeather(await getWeatherForecast(coords, date));
			} else if (
				// 14 < date <= 300
				date.getTime() - today.getTime() > FORECAST_MAX_DAYS &&
				date.getTime() - today.getTime() <= FUTURE_MAX_DAYS
			) {
				setWeather(await getWeatherFuture(coords, date));
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

	useEffect(() => {
		if (defaultStop) {
			refetch(defaultStop);
		}
	}, [defaultStop, refetch]);

	return {
		weather,
		loading,
		error,
		refetch,
	};
};
