import { useCallback, useState } from 'react';

import { uploadImage } from '../model';
import { ImageError } from './types';

// TODO: Maybe rewrite it to useMutation?
export const useUploadImage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ImageError | null>(null);

	const upload = useCallback(
		async (imageFile: File) => {
			try {
				setLoading(true);
				setError(null);

				const limitInMb = 4 * 1024 * 1024; // 4 megabytes
				if (imageFile.size > limitInMb) {
					setError(ImageError.MAX_SIZE);
					return null;
				}

				const image = await uploadImage(imageFile);
				return image;
			} catch (e) {
				setError(ImageError.UNKNOWN_ERROR);
				console.error((e as Error).message);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[setLoading, setError],
	);

	return { upload, loading, error };
};
