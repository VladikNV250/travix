import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';
import { useMap } from 'features/map';
import { removeStop } from 'features/trip';
import { useAppDispatch } from 'shared/lib';

export interface UseStopItemProps {
	tripId: Trip['id'];
	stop: Stop;
	day?: string;
}

export interface UseStopItemResult {
	stopData: Stop;
	displayDay?: string;

	onDeleteClick: () => void;
	onEditClick: () => void;
	onItemClick: () => void;
}

export const useStopItem = ({
	stop,
	tripId,
	day,
}: UseStopItemProps): UseStopItemResult => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { map } = useMap();

	const onItemClick = useCallback(() => {
		map?.flyTo(stop.location, 10, { animate: true });
	}, [map, stop.location]);

	const onDeleteClick = useCallback(() => {
		dispatch(removeStop({ tripId, stop }));
	}, [dispatch, stop, tripId]);

	const onEditClick = useCallback(() => {
		navigate(`/trip/${tripId}/stop/${stop.id}`);
	}, [tripId, stop.id, navigate]);

	return {
		stopData: stop,
		displayDay: day || '',
		onDeleteClick,
		onEditClick,
		onItemClick,
	};
};
