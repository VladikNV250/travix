import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Trip, validateTrip } from 'entities/trip';
import { editTrip, selectTrip } from 'features/trip';
import { useAppDispatch, useAppSelector } from 'shared/lib';

import { EditTripFormData, IEditTripViewModel } from './types';

export const useEditTripViewModel = (): IEditTripViewModel => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { tripId } = useParams<{ tripId: string }>();

	const trip = useAppSelector(selectTrip(tripId ?? ''));

	const [formData, setFormData] = useState<EditTripFormData>({
		name: '',
		color: '',
	});
	const [pickerIsOpen, setPickerIsOpen] = useState(false);

	useEffect(() => {
		if (trip) {
			setFormData({
				name: trip.name ?? 'New Trip',
				color: trip.color ?? '#ff0000',
			});
		} else {
			setFormData({
				name: 'New Trip',
				color: '#ff0000',
			});
		}
	}, [trip]);

	const onSaveTrip = useCallback(() => {
		if (!trip) {
			console.error('Trip not found, cannot save.');
			return;
		}

		const updatedTrip: Trip = {
			...trip,
			name: formData.name,
			color: formData.color,
		};

		if (validateTrip(updatedTrip)) {
			dispatch(editTrip(updatedTrip));
			navigate(`/trip/${tripId}`);
		} else {
			console.warn('Validation failed for trip: ', updatedTrip);
		}
	}, [dispatch, formData, navigate, trip, tripId]);

	const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setFormData(prevState => ({
			...prevState,
			name: value,
		}));
	}, []);

	const onColorChange = useCallback((newColor: string) => {
		setFormData(prevState => ({
			...prevState,
			color: newColor,
		}));
	}, []);

	const onToggleColorPicker = useCallback(() => {
		setPickerIsOpen(prev => !prev);
	}, []);

	const onGoBack = useCallback(() => {
		navigate(`/trip/${tripId}`);
	}, [navigate, tripId]);

	const isFormValid = useMemo(
		() => formData.name.trim().length > 0,
		[formData.name],
	);

	return {
		tripId,
		formData,
		isColorPickerOpen: pickerIsOpen,
		onNameChange,
		onColorChange,
		onToggleColorPicker,
		onSaveTrip,
		onGoBack,
		isFormValid,
		tripExists: Boolean(trip),
	};
};
