export interface ApiTodayResponse {
	current: {
		temp_c: number;
		temp_f: number;
		condition: {
			text: string;
			icon: string;
			code: number;
		};
		is_day: number; // 1 - Yes, 0 - No
	};
}

export interface ApiForecastResponse {
	forecast: {
		forecastday: ForecastDay[];
	};
}

interface ForecastDay {
	date: string;
	day: {
		maxtemp_c: number;
		maxtemp_f: number;
		mintemp_c: number;
		mintemp_f: number;
		avgtemp_c: number;
		avgtemp_f: number;
		condition: {
			text: string;
			icon: string;
			code: number;
		};
	};
}
