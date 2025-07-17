import { ChangeEvent, FC } from 'react';

import { useUploadImage } from '../lib/useUploadImage';
import { Image } from '../model';

interface ImageUploadProps {
	onUpload: (image: Image) => void;
}

export const ImageUpload: FC<ImageUploadProps> = ({ onUpload }) => {
	const { upload, loading } = useUploadImage();

	const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const limitInMb = 4 * 1024 * 1024; // 4 megabytes
			if (file.size > limitInMb) return;

			const image = await upload(file);
			if (image) {
				onUpload(image);
			}
		}
	};

	return (
		<div className="w-full">
			<label
				htmlFor="image"
				className="block w-full cursor-pointer bg-yellow-200 px-5 py-2 text-center"
			>
				{loading ? 'Loading...' : 'Add images to stop'}
			</label>
			<input
				type="file"
				name="image"
				id="image"
				accept="image/png, image/jpeg, image/jpg, image/gif, image/apng, image/tiff"
				className="hidden"
				onChange={handleFile}
			/>
		</div>
	);
};
