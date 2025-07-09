import { useCallback, useEffect, useState } from 'react';

import { Stop } from 'entities/stop';

import { getHoliday } from '../model';
import { Holiday } from '../model/types';

// TODO: maybe rewrite it using react-query
export const useHoliday = (defaultStop: Stop | null = null) => {
	const [holiday, setHoliday] = useState<Holiday | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<unknown | null>(null);

	const refetch = useCallback(async (stop: Stop) => {
		if (!stop.countryCode) return;

		try {
			setLoading(true);

			const holiday = await getHoliday(stop.countryCode, stop.arrivalDate);
			setHoliday(holiday);
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
