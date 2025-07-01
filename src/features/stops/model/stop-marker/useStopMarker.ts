import { useCallback, useMemo } from 'react';

import { latLng } from 'leaflet';

import { useHoliday } from 'entities/holidays';
import { Stop } from 'entities/stop';
import { useWeather } from 'entities/weather';

import { UseStopMarkerHookResult } from './types';

export const useStopMarker = (): UseStopMarkerHookResult => {
	const { weather, loading: weatherLoading, getWeather } = useWeather();
	const { holiday, loading: holidayLoading, getHoliday } = useHoliday();

	const updateStopInfo = useCallback(
		async (stop: Stop) => {
			const stopDate = new Date(stop.arrivalDate || Date.now());

			const latlng = latLng(stop.location);
			const latlngStr = `${latlng.lat},${latlng.lng}`;
			await getWeather(latlngStr, stopDate);

			if (stop.countryCode) {
				await getHoliday(stop.countryCode, stopDate);
			}
		},
		[getHoliday, getWeather],
	);

	return useMemo(
		() => ({
			weather,
			holiday,
			isLoading: weatherLoading || holidayLoading,
			updateStopInfo,
		}),
		[weather, holiday, weatherLoading, holidayLoading, updateStopInfo],
	);
};
