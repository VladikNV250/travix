import { useCallback, useEffect, useState } from 'react';

import { Stop } from 'entities/stop';

import { fetchHoliday } from '../api/holidaysApi';
import { Holiday } from '../model/types';

// TODO: maybe rewrite it using react-query
export const useHoliday = (defaultStop: Stop | null = null) => {
	const [holiday, setHoliday] = useState<Holiday | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<unknown | null>(null);

	const refetch = useCallback(async (stop: Stop) => {
		if (!stop.countryCode) return;

		const date = new Date(stop.arrivalDate || Date.now());
		try {
			setLoading(true);

			const response = await fetchHoliday(stop.countryCode, date);

			setHoliday(response);
		} catch (e) {
			setError(e);
			console.error('Holiday-API-error', e);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (defaultStop) {
			refetch(defaultStop);
		}
	}, [defaultStop, refetch]);

	return { holiday, loading, error, refetch };
};
