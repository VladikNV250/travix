import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import { Trip, validateTrip } from 'entities/trip';
import { editTrip, selectTrip } from 'features/trip';
import { useAppDispatch, useAppSelector } from 'shared/lib';

export const useEditTripForm = (tripId?: string) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const trip = useAppSelector(selectTrip(tripId ?? ''));

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [color, setColor] = useState(trip?.color ?? '#ff0000');

	const onSaveTrip = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		setIsSubmitting(true);

		if (!trip) return console.error('Trip not found, cannot save.');

		const newTrip: Trip = {
			...trip,
			name: (formData.get('name') || trip.name).toString(),
			color: color || trip.color,
		};

		if (validateTrip(newTrip)) {
			dispatch(editTrip(newTrip));
			navigate('/trip/' + tripId);
		}

		console.error('Validation failed for trip: ', newTrip);
		setIsSubmitting(false);
	};

	return {
		isSubmitting,
		formData: {
			color,
			name: trip?.name || 'New trip',
		},
		onColorChange: setColor,
		onSubmit: onSaveTrip,
	};
};
