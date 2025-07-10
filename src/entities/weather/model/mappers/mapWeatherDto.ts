import { Weather } from '..';
import { WeatherCurrentDto, WeatherForecastdayDto } from '../../api';

type WeatherDto = WeatherCurrentDto | WeatherForecastdayDto;

export const mapWeatherDto = (weatherDto: WeatherDto): Weather => {
	if ('date' in weatherDto) {
		return {
			condition: weatherDto.day.condition.text,
			icon: weatherDto.day.condition.icon,
			temperature: weatherDto.day.maxtemp_c,
		};
	} else {
		return {
			condition: weatherDto.condition.text,
			icon: weatherDto.condition.icon,
			temperature: weatherDto.temp_c,
		};
	}
};
