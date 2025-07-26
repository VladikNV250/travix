import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useState,
} from 'react';

import { getGeocode } from 'entities/geo';
import { Stop, createStop } from 'entities/stop';
import { addStop, editStop } from 'entities/trip';
import { useMap } from 'features/map';
import { useAppDispatch } from 'shared/lib';

import { ErrorType, validateStopForm } from '../lib';
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
	const [error, setError] = useState<ErrorType | null>(null);

	const onSaveStop = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			try {
				setIsSubmitting(true);
				setError(null);

				const error = validateStopForm(formData);

				if (error) return setError(error);

				if (isEditMode && initialData?.location) {
					const updatedStop = {
						...initialData,
						...formData,
					} as Stop;

					const newGeocode = await getGeocode(updatedStop.address);

					if (!newGeocode) return setError(ErrorType.NOT_EXIST_ADDRESS);

					updatedStop.location = newGeocode.location;
					dispatch(editStop({ tripId, updatedStop }));
					onClose?.();
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
				setError(ErrorType.UNKNOWN);
				console.error((e as Error).message);
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
			setFormData,
		],
	);

	return {
		isSubmitting,
		error,
		onSaveStop,
	};
};
