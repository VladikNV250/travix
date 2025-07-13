import { mapImageDto } from '../mappers';
import { imageApi } from 'entities/image/api';

export const uploadImage = async (imageFile: File) => {
	const formData = new FormData();
	formData.append('image', imageFile);

	const data = await imageApi.uploadImage(formData);
	return mapImageDto(data);
};
