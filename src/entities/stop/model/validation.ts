import { Stop } from './types';

export const validateStop = (stop: Stop): boolean => {
	if (stop.address === '') return false;

	if (stop.arrivalDate !== '' && stop.departureDate !== '') {
		const arrivalDate = new Date(stop.arrivalDate);
		const departureDate = new Date(stop.departureDate);
		if (arrivalDate > departureDate) return false;
	}

	return true;
};
