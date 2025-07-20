import { v4 as uuidv4 } from 'uuid';

import { Trip } from 'entities/trip';

// TODO: We need to think about validation of trips
export const createTrip = (initialData?: Partial<Trip>) => {
	const trip: Trip = {
		id: uuidv4(),
		name: initialData?.name ?? 'New Trip',
		color: initialData?.color ?? '#ff0000',
		stops: initialData?.stops ?? [],
		route: initialData?.route ?? [],
	};

	return trip;
};
