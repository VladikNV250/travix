import { useNavigate } from 'react-router';

import { Stop } from 'entities/stop';
import { Trip, removeTrip, setStops } from 'entities/trip';
import { useAppDispatch } from 'shared/lib';

export const useTripActions = (trip?: Trip) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onEditClick = () => {
		navigate(`/trip/${trip?.id}/edit`);
	};

	const onDeleteClick = () => {
		dispatch(removeTrip(trip ?? null));
		navigate('/');
	};

	const setStopsOrder = (newStops: Stop[]) => {
		dispatch(
			setStops({
				tripId: trip?.id ?? '',
				stops: newStops,
			}),
		);
	};

	return {
		onEditClick,
		onDeleteClick,
		setStopsOrder,
	};
};
