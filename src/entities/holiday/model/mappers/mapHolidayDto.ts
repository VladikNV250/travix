import { HolidayDto } from '../../api';
import { Holiday } from '../types';

export const mapHolidayDto = (holidayDto: HolidayDto): Holiday => ({
	name: holidayDto.name,
	date: holidayDto.date.iso,
});
