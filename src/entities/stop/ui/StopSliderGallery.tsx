import { FC } from 'react';

import { Stop } from 'entities/stop/model/types';

interface StopSliderGalleryProps {
	gallery: Stop['images'];
}

export const StopSliderGallery: FC<StopSliderGalleryProps> = ({ gallery }) => {
	return (
		<div
			className="mx-auto flex max-w-full overflow-hidden py-5 *:flex-[0_0_100%]"
			style={{
				//TODO: Refactor this mega formule :)
				width: `${gallery.length * 250 + 20 * (gallery.length - 1)}px`,
			}}
		>
			<div className="animate-scrolling flex gap-5 pr-5 will-change-transform">
				{gallery.map((image, index) => (
					<div
						className="h-37.5 w-62.5"
						key={image.id}
					>
						<img
							src={image.url}
							alt={`Slide of place #${index + 1}`}
							className="size-full rounded-lg object-cover"
						/>
					</div>
				))}
			</div>
			<div
				aria-hidden
				className="animate-scrolling flex gap-5 pr-5 will-change-transform"
			>
				{gallery.map((image, index) => (
					<div
						className="h-37.5 w-62.5"
						key={image.id}
					>
						<img
							src={image.url}
							alt={`Slide of place #${index + 1}`}
							className="size-full rounded-lg object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
};
