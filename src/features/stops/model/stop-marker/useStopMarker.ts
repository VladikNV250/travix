import { useCallback, useMemo } from 'react';

import { latLng } from 'leaflet';

import { Holiday, useHoliday } from 'entities/holidays';
import { Stop } from 'entities/stop';
import { Weather, useWeather } from 'entities/weather';

export interface UseStopMarkerResult {
	weather: Weather | null;
	holiday: Holiday | null;
	isLoading: boolean;
	updateStopInfo: (stop: Stop) => Promise<void>;
}

export const useStopMarker = (): UseStopMarkerResult => {
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
