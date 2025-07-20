import { Dispatch, SetStateAction } from 'react';

import { Image } from 'entities/image';

import { StopFormData } from './types';

/**
 * Manages the list of images associated with a stop.
 * Provides functions to add and delete images from the form state.
 */
export const useStopFormImage = (
	setFormData: Dispatch<SetStateAction<StopFormData>>,
) => {
	const onAddImage = (image: Image) => {
		setFormData(prevState => ({
			...prevState,
			images: [...prevState.images, image],
		}));
	};

	const onDeleteImage = (id: string) => {
		setFormData(prevState => ({
			...prevState,
			images: prevState.images.filter(image => image.id !== id),
		}));
	};

	return {
		onAddImage,
		onDeleteImage,
	};
};
