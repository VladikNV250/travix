import { useHoliday } from 'entities/holidays';
import { Stop } from 'entities/stop';
import { useWeather } from 'entities/weather';

export const useStopMarker = () => {
	const {
		weather,
		loading: weatherLoading,
		refetch: refetchWeather,
	} = useWeather();
	const {
		holiday,
		loading: holidayLoading,
		refetch: refetchHoliday,
	} = useHoliday();

	const updateStopInfo = async (stop: Stop) => {
		await refetchWeather(stop);
		await refetchHoliday(stop);
	};

	return {
		weather,
		holiday,
		isLoading: weatherLoading || holidayLoading,
		updateStopInfo,
	};
};
