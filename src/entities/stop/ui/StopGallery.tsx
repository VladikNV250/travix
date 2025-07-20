import { FC } from 'react';

import { Image } from 'entities/image';
import { TrashIcon } from 'shared/assets';

interface StopGalleryProps {
	images: Image[];
	onDelete: (id: string) => void;
}

export const StopGallery: FC<StopGalleryProps> = ({ images, onDelete }) => {
	return (
		images.length > 0 && (
			<div className="mt-5 rounded-lg bg-neutral-400 p-2.5">
				<h2 className="mb-3.5 text-center">Stop Gallery</h2>
				<div className="grid grid-flow-row grid-cols-2 gap-2.5">
					{images.map(image => (
						<div
							key={image.id}
							className="peer relative max-h-25 max-w-25 justify-self-start even:justify-self-end"
						>
							<img
								className="aspect-square h-25 max-w-25 object-contain"
								src={image.url}
								alt=""
							/>
							<button
								type="button"
								className="absolute top-1 right-1 hidden items-center justify-center rounded-full bg-neutral-200 p-1 peer-hover:flex"
								onClick={() => onDelete(image.id)}
							>
								<TrashIcon
									width={20}
									height={20}
								/>
							</button>
						</div>
					))}
				</div>
			</div>
		)
	);
};
