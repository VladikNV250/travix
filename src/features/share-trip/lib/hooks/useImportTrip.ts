import { useState } from 'react';

import { addTrip } from 'entities/trip';
import { PARSING_ERROR_MESSAGE } from 'features/share-trip/config';
import { useAppDispatch } from 'shared/lib';

import { ImportStatus } from '../types';
import { parseShareCode } from '../utils/parseShareCode';

export const useImportTrip = () => {
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();

	const importTrip = (code: string) => {
		const trip = parseShareCode(code);

		if (trip) {
			dispatch(addTrip(trip));
			setError(null);
			return ImportStatus.SUCCESS;
		} else {
			setError(PARSING_ERROR_MESSAGE);
			return ImportStatus.ERROR;
		}
	};

	return {
		importTrip,
		error,
	};
};
