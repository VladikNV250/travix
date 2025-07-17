import { FC } from 'react';
import { useNavigate } from 'react-router';

import {
	TripItem,
	addTrip,
	createTrip,
	selectTrips,
	setTrips,
} from 'entities/trip';
import { DndWrapper, useAppDispatch, useAppSelector } from 'shared/lib';

const HomePage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const trips = useAppSelector(selectTrips);

	const handleCreate = () => {
		const trip = createTrip();

		if (trip) {
			dispatch(addTrip(trip));
			navigate(`/trip/${trip.id}/edit`);
		}
	};

	return (
		<div>
			<button
				onClick={handleCreate}
				className="w-full bg-green-800 px-4 py-2 text-white"
			>
				Add New Trip
			</button>
			<DndWrapper
				items={trips}
				setItems={newTrips => dispatch(setTrips(newTrips))}
			>
				<div className="mt-5 flex flex-col gap-1">
					{trips.map(trip => (
						<TripItem
							key={trip.id}
							trip={trip}
						/>
					))}
				</div>
			</DndWrapper>
		</div>
	);
};

export default HomePage;
