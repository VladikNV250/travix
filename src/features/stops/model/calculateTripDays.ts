import { Stop } from 'entities/stop';

// TODO: move it somewhere else
export const calculateTripDays = (stops: Stop[]): string[] => {
	let lastDay = 1;
	const tripDays: string[] = [];
	stops.forEach(stop => {
		if (!stop.arrivalDate || !stop.departureDate)
			return tripDays.push(`Day ${lastDay++}`);

		const msInDay = 1000 * 60 * 60 * 24;
		const arrivalDate = new Date(stop.arrivalDate);
		const departureDate = new Date(stop.departureDate);
		const countOfdays = Math.floor(
			(departureDate.getTime() - arrivalDate.getTime()) / msInDay,
		);

		if (countOfdays > 1) {
			tripDays.push(`Day ${lastDay}-${lastDay + countOfdays - 1}`);
			lastDay = lastDay + countOfdays;
		} else {
			tripDays.push(`Day ${lastDay++}`);
		}
	});

	return tripDays;
};
