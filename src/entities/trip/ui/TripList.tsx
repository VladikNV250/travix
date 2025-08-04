import { useAppSelector } from 'shared/lib';

import { selectTrips } from '../model';
import { TripItem } from './TripItem';

export const TripList = () => {
	const trips = useAppSelector(selectTrips);

	return (
		<div className="flex flex-col gap-y-2 p-4">
			{trips.map(trip => (
				<TripItem
					key={trip.id}
					trip={trip}
				/>
			))}
		</div>
	);
};
