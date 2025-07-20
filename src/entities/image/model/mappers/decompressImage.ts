import { Image, ImageRaw } from '../types';

export const decompressImage = (image: ImageRaw): Image => {
	return {
		id: image[0],
		url: image[1],
	};
};
