import { useCallback, useState } from 'react';

import { uploadImage } from '../model';

// TODO: Maybe rewrite it to useMutation?
export const useUploadImage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const upload = useCallback(
		async (imageFile: File) => {
			try {
				setLoading(true);

				const image = await uploadImage(imageFile);
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
