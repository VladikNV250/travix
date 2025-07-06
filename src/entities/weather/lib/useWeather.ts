import { useCallback, useEffect, useState } from 'react';

import { latLng } from 'leaflet';

import { Stop } from 'entities/stop';

import {
	getWeatherForecast,
	getWeatherFuture,
	getWeatherToday,
} from '../api/weatherApi';
import { Weather } from '../model/types';

// TODO: maybe rewrite it using react-query
export const useWeather = (defaultStop: Stop | null = null) => {
	const [weather, setWeather] = useState<Weather | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<unknown | null>(null);

	const refetch = useCallback(async (stop: Stop) => {
		const day = 1 * 24 * 60 * 60 * 1000;
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const date = new Date(stop.arrivalDate || Date.now());
		const coords = latLng(stop.location);
		const coordsStr = `${coords.lat},${coords.lng}`;

		try {
			setLoading(true);
			setError(null);

			if (
				date.getTime() - today.getTime() >= 0 &&
				date.getTime() - today.getTime() <= day
			) {
				setWeather(await getWeatherToday(coordsStr));
			} else if (
				date.getTime() - today.getTime() >= 0 &&
				date.getTime() - today.getTime() <= 14 * day
			) {
				setWeather(await getWeatherForecast(coordsStr, date));
			} else if (
				date.getTime() - today.getTime() > 14 * day &&
				date.getTime() - today.getTime() <= 300 * day
			) {
				setWeather(await getWeatherFuture(coordsStr, date));
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
