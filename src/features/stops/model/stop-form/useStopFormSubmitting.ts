import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useState,
} from 'react';

import { Stop, validateStop } from 'entities/stop';
import { useMap } from 'features/map';
import { addStop, editStop } from 'features/trip';
import { useAppDispatch } from 'shared/lib';

import { createStop } from '../createStop';
import { StopFormData } from './types';

interface UseStopFormSubmittingProps {
	tripId: string;
	initialData?: Stop;
	formData: StopFormData;

	setFormData: Dispatch<SetStateAction<StopFormData>>;
	onClose?: () => void;

	isFormValid: boolean;
	isEditMode: boolean;
}

interface UseStopFormSubmittingResult {
	isSubmitting: boolean;
	submitError: string | null;
	onSaveStop: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useStopFormSubmitting = ({
	tripId,
	initialData,
	formData,
	setFormData,
	onClose,
	isEditMode,
	isFormValid,
}: UseStopFormSubmittingProps): UseStopFormSubmittingResult => {
	const dispatch = useAppDispatch();
	const { map } = useMap();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

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

				if (isEditMode) {
					const updatedStop: Stop = {
						...initialData,
						...formData,
					} as Stop;

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
	};
};
