import { Image, ImageRaw } from '../types';

export const compressImage = (image: Image): ImageRaw => {
	return [image.id, image.url];
};
