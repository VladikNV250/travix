import { useNavigate } from 'react-router';

import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';
import { useMap } from 'features/map';
import { removeStop } from 'features/trip';
import { useAppDispatch } from 'shared/lib';

export const useStopItem = (tripId: Trip['id'], stop: Stop, day?: string) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { map } = useMap();

	const onItemClick = () => {
		map?.flyTo(stop.location, 10, { animate: true });
	};

	const onDeleteClick = () => {
		dispatch(removeStop({ tripId, stop }));
	};

	const onEditClick = () => {
		navigate(`/trip/${tripId}/stop/${stop.id}`);
	};

	return {
		stopData: stop,
		displayDay: day || '',
		onDeleteClick,
		onEditClick,
		onItemClick,
	};
};
