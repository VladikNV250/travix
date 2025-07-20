import { Trip } from 'entities/trip';

// TODO: We need to think about validation of trips
export const createTrip = (initialData?: Partial<Trip>) => {
	const trip: Trip = {
		id: new Date().getTime().toString(),
		name: initialData?.name ?? 'New Trip',
		color: initialData?.color ?? '#ff0000',
		stops: initialData?.stops ?? [],
		route: initialData?.route ?? [],
	};

	return trip;
};
