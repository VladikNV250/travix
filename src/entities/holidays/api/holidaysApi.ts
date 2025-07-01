import { apiClient } from 'shared/api';
import { formatDate } from 'shared/lib';

import { Holiday } from '../model/types';
import { HolidayAPI } from './types';

export const fetchHoliday = async (
	country: string,
	date: Date,
): Promise<Holiday | null> => {
	const response = await apiClient.get<HolidayAPI>('/api/holidays', {
		params: {
			country,
			date: formatDate(date, 'yyyy-mm-dd'),
		},
	});

	const holiday = response.response.holidays[0];

	if (holiday) {
		return {
			name: holiday.name,
			date: holiday.date.iso,
		};
	} else {
		return null;
	}
};
