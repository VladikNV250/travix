import { mapHolidayDto } from '../mappers';
import { formatDate } from 'shared/lib';

import { holidayApi } from '../../api';

export const getHoliday = async (country: string, date: string) => {
	const formattedDate = formatDate(new Date(date || Date.now()), 'yyyy-mm-dd');
	const holidays = await holidayApi.fetchHolidays(country, formattedDate);

	return holidays.length > 0 ? mapHolidayDto(holidays[0]) : null;
};
