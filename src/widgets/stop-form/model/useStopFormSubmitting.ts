import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useState,
} from 'react';

import { getGeocode } from 'entities/geo';
import { Stop, createStop, validateStop } from 'entities/stop';
import { addStop, editStop } from 'entities/trip';
import { useMap } from 'features/map';
import { useAppDispatch } from 'shared/lib';

import { StopFormData } from './types';

/**
 * Handles the stop form submission process.
 * Manages adding/editing stops, loading states, and error handling.
 */
export const useStopFormSubmitting = (
	tripId: string,
	initialData: Partial<Stop> | null,
	formData: StopFormData,
	setFormData: Dispatch<SetStateAction<StopFormData>>,
	isEditMode: boolean,
	onClose?: () => void,
) => {
	const dispatch = useAppDispatch();
	const { map } = useMap();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const isFormValid = formData.address.trim().length > 0;

	const onSaveStop = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			try {
				setIsSubmitting(true);
				setSubmitError(null);

				if (!isFormValid) {
					setSubmitError('Please fill in all required fields.');
					return;
				}

				if (isEditMode && initialData?.location) {
					const updatedStop = {
						...initialData,
						...formData,
					} as Stop;

					updatedStop.location =
						(await getGeocode(updatedStop.address))?.location ??
						initialData.location;

					if (validateStop(updatedStop)) {
						dispatch(editStop({ tripId, updatedStop }));
						onClose?.();
					} else {
						setSubmitError('Validation failed for updated stop.');
					}
				} else {
					const stop = await createStop(formData);

					if (stop) {
						dispatch(addStop({ tripId, stop }));
						map?.flyTo(stop.location, 10, { animate: true });

						setFormData({
							address: '',
							arrivalDate: '',
							departureDate: '',
							notes: '',
							images: [],
						});
						onClose?.();
					}
				}
			} catch (e: unknown) {
				const knownErorr = e as Error;
				setSubmitError(knownErorr.message || 'Unknown error.');
			} finally {
				setIsSubmitting(false);
			}
		},
		[
			dispatch,
			isEditMode,
			formData,
			initialData,
			map,
			onClose,
			tripId,
			isFormValid,
			setFormData,
		],
	);

	return {
		isSubmitting,
		submitError,
		onSaveStop,
		isFormValid,
	};
};
