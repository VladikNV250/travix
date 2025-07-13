import { ResponseCode, apiClient } from 'shared/api';

import { HolidayApi, HolidayDto, HolidaysResponse } from './types';

export const holidayApi = {
	fetchHolidays: async (
		country: string,
		date: string,
	): Promise<HolidayDto[]> => {
		const { response, meta } = await apiClient.get<
			HolidayApi<HolidaysResponse>
		>('/api/holidays', {
			params: {
				country,
				date,
			},
		});

		if (meta.code === ResponseCode.SUCCESS) {
			return response.holidays;
		} else {
			throw new Error(`Error fetching holidays: ${meta.code}`);
		}
	},
};
