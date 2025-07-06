import { useCallback, useState } from 'react';

import { uploadImage } from '../api/uploadImage';

export const useUploadImage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const upload = useCallback(
		async (imageFile: File) => {
			try {
				setLoading(true);
				const formData = new FormData();
				formData.append('image', imageFile);

				const image = await uploadImage(formData);

				return image;
			} catch (e) {
				const knownError = e as Error;

				setError(knownError);
			} finally {
				setLoading(false);
			}
		},
		[setLoading, setError],
	);

	return { upload, loading, error };
};
