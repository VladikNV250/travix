import { useState } from 'react';
import { useParams } from 'react-router';

import { useItemDropdown } from 'shared/lib';

import { useTripActions } from './useTripActions';
import { useTripAnimation } from './useTripAnimation';
import { useTripData } from './useTripData';
import { useTripStop } from './useTripStop';

export const useTripPage = () => {
	const { tripId } = useParams<{ tripId: string }>();
	const [isOpenStopForm, setIsOpenStopForm] = useState<boolean>(false);

	const { trip, tripInfo } = useTripData();
	const { onDeleteClick, onEditClick, setStopsOrder } = useTripActions(trip);
	const animationControls = useTripAnimation(trip);
	const { displayStops, dayView, toggleDayView } = useTripStop(trip);
	const {
		isOpened: isTripMenuOpened,
		onToggle: toggleTripMenu,
		onClose: onCloseTripMenu,
	} = useItemDropdown(`${tripId ?? ''}-trip`);

	return {
		trip: trip ?? null,
		tripData: tripInfo,
		stopDisplay: {
			stops: displayStops,
			dayView,
			toggleDayView,
			setStopsOrder,
		},
		stopForm: {
			isOpen: isOpenStopForm,
			open: () => setIsOpenStopForm(true),
			close: () => setIsOpenStopForm(false),
		},
		tripMenu: {
			isOpen: isTripMenuOpened,
			toggle: toggleTripMenu,
			close: onCloseTripMenu,
			edit: onEditClick,
			delete: onDeleteClick,
		},
		animation: animationControls,
	};
};
