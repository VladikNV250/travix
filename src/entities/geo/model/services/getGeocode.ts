import { mapGeocodeDto } from '../mappers/mapGeocodeDto';
import { geoApi } from 'entities/geo/api';

export const getGeocode = async (address: string) => {
	const possibleGeocodes = await geoApi.geocodePlace(address);

	return possibleGeocodes.length > 0
		? mapGeocodeDto(possibleGeocodes[0])
		: null;
};
