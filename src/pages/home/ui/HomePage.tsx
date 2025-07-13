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

import styles from './style.module.scss';

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
		<div className={styles.home}>
			<button
				onClick={handleCreate}
				className={styles.button}
			>
				Add New Trip
			</button>
			<DndWrapper
				items={trips}
				setItems={newTrips => dispatch(setTrips(newTrips))}
			>
				<div className={styles.tripList}>
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
