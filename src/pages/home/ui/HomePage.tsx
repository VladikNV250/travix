import { FC } from 'react';
import { useNavigate } from 'react-router';

import {
	TripItem,
	addTrip,
	createTrip,
	selectTrips,
	setTrips,
} from 'entities/trip';
import { ImportPopup, usePopup } from 'features/share-trip';
import { DndWrapper, useAppDispatch, useAppSelector } from 'shared/lib';

const HomePage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const trips = useAppSelector(selectTrips);

	const popup = usePopup();

	const handleCreate = () => {
		const trip = createTrip();

		if (trip) {
			dispatch(addTrip(trip));
			navigate(`/trip/${trip.id}/edit`);
		}
	};

	return (
		<div className="space-y-5">
			<ImportPopup
				isOpen={popup.isOpen}
				closePopup={popup.close}
			/>
			<div className="space-y-2">
				<button
					onClick={handleCreate}
					className="w-full bg-green-800 px-4 py-2 text-white"
				>
					Add New Trip
				</button>
				<button
					onClick={popup.open}
					className="w-full bg-blue-800 px-4 py-2 text-white"
				>
					Import Trip
				</button>
			</div>
			<DndWrapper
				items={trips}
				setItems={newTrips => dispatch(setTrips(newTrips))}
			>
				<div className="flex flex-col gap-1">
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
