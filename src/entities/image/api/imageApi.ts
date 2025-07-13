import { apiClient } from 'shared/api';

import { IMAGE_API_KEY, IMAGE_BASE_URL } from '../config';
import { ImageDto, ImageUploadResponse } from './types';

export const imageApi = {
	uploadImage: async (data: FormData): Promise<ImageDto> => {
		const response = await apiClient.post<ImageUploadResponse>(
			`${IMAGE_BASE_URL}/upload`,
			data,
			{
				params: {
					key: IMAGE_API_KEY,
				},
			},
		);

		return response.data;
	},
};
