import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import { useDebounce } from 'use-debounce';

import { Image } from 'entities/image';
import { Stop, validateStop } from 'entities/stop';
import { Prediction, autocompletePlace } from 'features/geo';
import { useMap } from 'features/map';
import { addStop, editStop } from 'features/trip';
import { useAppDispatch } from 'shared/lib';

import { createStop } from '../createStop';
import {
	IStopFormViewModel,
	IStopFormViewModelProps,
	StopFormData,
} from './types';

export const useStopFormViewModel = ({
	tripId,
	initialData,
	onClose,
}: IStopFormViewModelProps): IStopFormViewModel => {
	const dispatch = useAppDispatch();
	const { map } = useMap();

	const [predictions, setPredictions] = useState<Prediction[]>([]);
	const [formData, setFormData] = useState<StopFormData>({
		address: initialData?.address || '',
		arrivalDate: initialData?.arrivalDate || '',
		departureDate: initialData?.departureDate || '',
		notes: initialData?.notes || '',
		images: initialData?.images || [],
	});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const [debouncedAddress] = useDebounce(formData.address, 400);

	const editMode = useMemo(() => Boolean(initialData), [initialData]);

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

	const isFormValid = useMemo(
		() => formData.address.trim().length > 0,
		[formData.address],
	);

	useEffect(() => {
		(async () => {
			if (debouncedAddress !== '') {
				const predictions = await autocompletePlace(debouncedAddress);
				setPredictions(predictions);
			} else {
				setPredictions([]);
			}
		})();
	}, [debouncedAddress]);

	const onCancel = useCallback(() => {
		onClose?.();
	}, [onClose]);

	const onDataChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

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

				if (editMode) {
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
			editMode,
			formData,
			initialData,
			map,
			onClose,
			tripId,
			isFormValid,
		],
	);

	const onAddImage = useCallback((image: Image) => {
		setFormData(prevState => ({
			...prevState,
			images: [...prevState.images, image],
		}));
	}, []);

	const onDeleteImage = useCallback((id: string) => {
		setFormData(prevState => ({
			...prevState,
			images: prevState.images.filter(image => image.id !== id),
		}));
	}, []);

	const onPredictionSelect = useCallback((description: string) => {
		setFormData(prevState => ({
			...prevState,
			address: description,
		}));
	}, []);

	return {
		predictions,
		formData,
		onAddImage,
		onPredictionSelect,
		onDataChange,
		onDeleteImage,
		onSaveStop,
		onCancel,
		editMode,
		hasUnsavedChanges,
		isFormValid,
		isSubmitting,
		submitError,
	};
};
