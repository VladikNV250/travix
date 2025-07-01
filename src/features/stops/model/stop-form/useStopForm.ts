import { ChangeEvent, FormEvent, useCallback } from 'react';

import { Image } from 'entities/image';
import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';
import { Prediction } from 'features/geo';

import { StopFormData } from './types';
import { useStopFormImage } from './useStopFormImage';
import { useStopFormPredictions } from './useStopFormPredictions';
import { useStopFormState } from './useStopFormState';
import { useStopFormSubmitting } from './useStopFormSubmitting';

export interface UseStopFormProps {
	tripId: Trip['id'];
	initialData?: Stop;

	onClose?: () => void;
}

interface UseStopFormResult {
	formData: StopFormData;
	predictions: Prediction[];
	submitError: string | null;

	onDataChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	onPredictionSelect: (description: string) => void;
	onAddImage: (image: Image) => void;
	onDeleteImage: (id: string) => void;
	onSaveStop: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	onCancel: () => void;

	hasUnsavedChanges: boolean;
	isEditMode: boolean;
	isFormValid: boolean;
	isSubmitting: boolean;
}

/**
 * Composing hook for managing the entire stop form lifecycle.
 * Integrates form state, address autocomplete, image handling, and submission logic.
 */
export const useStopForm = ({
	tripId,
	initialData,
	onClose,
}: UseStopFormProps): UseStopFormResult => {
	const {
		formData,
		setFormData,
		onDataChange,
		hasUnsavedChanges,
		isEditMode,
		isFormValid,
	} = useStopFormState({
		initialData,
	});

	const { isSubmitting, onSaveStop, submitError } = useStopFormSubmitting({
		tripId,
		initialData,
		formData,
		setFormData,
		onClose,
		isEditMode,
		isFormValid,
	});

	const onCancel = useCallback(() => {
		onClose?.();
	}, [onClose]);

	const { predictions } = useStopFormPredictions({ address: formData.address });

	const onPredictionSelect = useCallback(
		(description: string) => {
			setFormData(prevState => ({
				...prevState,
				address: description,
			}));
		},
		[setFormData],
	);

	const { onAddImage, onDeleteImage } = useStopFormImage({ setFormData });

	return {
		formData,
		predictions,
		submitError,

		onAddImage,
		onPredictionSelect,
		onDataChange,
		onDeleteImage,
		onSaveStop,
		onCancel,

		hasUnsavedChanges,
		isEditMode,
		isFormValid,
		isSubmitting,
	};
};
