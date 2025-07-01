import { Dispatch, SetStateAction, useCallback } from 'react';

import { Image } from 'entities/image';

import { StopFormData } from './types';

interface UseStopFormImageProps {
	setFormData: Dispatch<SetStateAction<StopFormData>>;
}

interface UseStopFormImageResult {
	onAddImage: (image: Image) => void;
	onDeleteImage: (id: string) => void;
}

/**
 * Manages the list of images associated with a stop.
 * Provides functions to add and delete images from the form state.
 */
export const useStopFormImage = ({
	setFormData,
}: UseStopFormImageProps): UseStopFormImageResult => {
	const onAddImage = useCallback(
		(image: Image) => {
			setFormData(prevState => ({
				...prevState,
				images: [...prevState.images, image],
			}));
		},
		[setFormData],
	);

	const onDeleteImage = useCallback(
		(id: string) => {
			setFormData(prevState => ({
				...prevState,
				images: prevState.images.filter(image => image.id !== id),
			}));
		},
		[setFormData],
	);

	return {
		onAddImage,
		onDeleteImage,
	};
};
