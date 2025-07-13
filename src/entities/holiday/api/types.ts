import { ResponseCode } from 'shared/api';

export interface HolidayApi<Response> {
	meta: {
		code: ResponseCode;
	};
	response: Response;
}

export interface HolidaysResponse {
	holidays: HolidayDto[];
}

export interface HolidayDto {
	name: string;
	description: string;
	country: HolidayCountryInfo;
	date: HolidayDateInfo;
	type: string[];
	primary_type: string;
	canonical_url: string;
	urlid: string;
	locations: string;
	states: string;
}

export interface HolidayCountryInfo {
	id: string;
	name: string;
}

export interface HolidayDateInfo {
	iso: string;
	datetime: HolidayDatetimeInfo;
	timezone?: HolidayTimezoneInfo;
}

export interface HolidayDatetimeInfo {
	year: number;
	month: number;
	day: number;
	hour?: number;
	minute?: number;
	second?: number;
}

export interface HolidayTimezoneInfo {
	offset: string;
	zoneabb: string;
	zoneoffset: number;
	zonedst: number;
	zonetotaloffset: number;
}
