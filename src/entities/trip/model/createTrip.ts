import { Trip } from 'entities/trip';

// TODO: We need to think about validation of trips
export const createTrip = () => {
	const trip: Trip = {
		id: new Date().getTime().toString(),
		name: 'New Trip',
		color: '#ff0000',
		stops: [],
		route: [],
	};

	return trip;
};
