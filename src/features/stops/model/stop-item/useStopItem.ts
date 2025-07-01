import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useMap } from 'features/map';
import { removeStop } from 'features/trip';
import { useAppDispatch } from 'shared/lib';

import { UseStopItemHookResult, UseStopItemProps } from './types';

export const useStopItem = ({
	stop,
	tripId,
	day,
}: UseStopItemProps): UseStopItemHookResult => {
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
