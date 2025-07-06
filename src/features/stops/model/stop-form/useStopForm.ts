import { useCallback } from 'react';

import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';

import { useStopFormImage } from './useStopFormImage';
import { useStopFormPredictions } from './useStopFormPredictions';
import { useStopFormState } from './useStopFormState';
import { useStopFormSubmitting } from './useStopFormSubmitting';

/**
 * Composing hook for managing the entire stop form lifecycle.
 * Integrates form state, address autocomplete, image handling, and submission logic.
 */
export const useStopForm = (
	tripId: Trip['id'],
	initialData: Partial<Stop>,
	onClose?: () => void,
) => {
	const {
		formData,
		setFormData,
		onDataChange,
		hasUnsavedChanges,
		isEditMode,
		isFormValid,
	} = useStopFormState(initialData);

	const { isSubmitting, onSaveStop, submitError } = useStopFormSubmitting(
		tripId,
		initialData,
		formData,
		setFormData,
		isEditMode,
		isFormValid,
		onClose,
	);

	const onCancel = useCallback(() => {
		onClose?.();
	}, [onClose]);

	const { predictions } = useStopFormPredictions(formData.address);

	const onPredictionSelect = useCallback(
		(description: string) => {
			setFormData(prevState => ({
				...prevState,
				address: description,
			}));
		},
		[setFormData],
	);

	const { onAddImage, onDeleteImage } = useStopFormImage(setFormData);

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
