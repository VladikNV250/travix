import { StopFormData } from '../model';
import { ErrorType } from './types';

export const validateStopForm = ({
	address,
	arrivalDate,
	departureDate,
}: StopFormData): ErrorType | null => {
	if (address.trim().length <= 0) {
		return ErrorType.REQUIRED_INPUTS;
	}

	if (arrivalDate && departureDate) {
		const arrival = new Date(arrivalDate);
		const departure = new Date(departureDate);
		if (arrival > departure) {
			return ErrorType.DATE_MISMATCH;
		}
	}

	return null;
};
