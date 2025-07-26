import { ChangeEvent, FC } from 'react';

import clsx from 'clsx';

import { useUploadImage } from '../lib/useUploadImage';
import { Image } from '../model';

interface ImageUploadProps {
	onUpload: (image: Image) => void;
}

export const ImageUpload: FC<ImageUploadProps> = ({ onUpload }) => {
	const { upload, loading, error } = useUploadImage();

	const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
		if (loading) return;

		const file = e.target.files?.[0];
		if (file) {
			const image = await upload(file);
			if (image) {
				onUpload(image);
			}
		}
	};

	return (
		<div className="w-full">
			{error && (
				<p className="mb-2 rounded border border-rose-400 bg-rose-300 p-4">
					{error}
				</p>
			)}
			<label
				htmlFor="image"
				className={clsx(
					'block w-full cursor-pointer bg-yellow-200 px-5 py-2 text-center',
					loading ? 'cursor-default' : 'cursor-pointer',
				)}
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
