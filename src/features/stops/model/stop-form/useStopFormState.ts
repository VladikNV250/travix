import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from 'react';

import { Stop } from 'entities/stop';

import { StopFormData } from './types';

interface UseStopFormStateProps {
	initialData?: Stop;
}

interface UseStopFormStateResult {
	formData: StopFormData;

	setFormData: Dispatch<SetStateAction<StopFormData>>;
	onDataChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;

	hasUnsavedChanges: boolean;
	isEditMode: boolean;
	isFormValid: boolean;
}

/**
 * Manages the internal state of the stop form.
 * Handles form data, updates, and computes form validity/changes.
 */
export const useStopFormState = ({
	initialData,
}: UseStopFormStateProps): UseStopFormStateResult => {
	const [formData, setFormData] = useState<StopFormData>({
		address: initialData?.address || '',
		arrivalDate: initialData?.arrivalDate || '',
		departureDate: initialData?.departureDate || '',
		notes: initialData?.notes || '',
		images: initialData?.images || [],
	});

	const hasUnsavedChanges = useMemo(
		() =>
			formData.address !== (initialData?.address || '') ||
			formData.arrivalDate !== (initialData?.arrivalDate || '') ||
			formData.departureDate !== (initialData?.departureDate || '') ||
			formData.notes !== (initialData?.notes || '') ||
			formData.images.length !== (initialData?.images.length || 0) ||
			!formData.images.every(
				(image, i) => image.id === (initialData?.images?.[i]?.id || ''),
			),
		[formData, initialData],
	);

	const onDataChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setFormData(prevState => ({
				...prevState,
				[name]: value,
			}));
		},
		[setFormData],
	);

	const isEditMode = useMemo(() => Boolean(initialData), [initialData]);

	const isFormValid = useMemo(
		() => formData.address.trim().length > 0,
		[formData.address],
	);

	return {
		formData,
		setFormData,
		onDataChange,
		hasUnsavedChanges,
		isEditMode,
		isFormValid,
	};
};
