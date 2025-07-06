import { FC } from 'react';

import { Stop } from 'entities/stop/model/types';

import styles from './style.module.scss';

interface IStopSliderGallery {
	gallery: Stop['images'];
}

export const StopSliderGallery: FC<IStopSliderGallery> = ({ gallery }) => {
	return (
		<div
			className={styles.carousel}
			style={{
				width: `${gallery.length * 250 + 20 * (gallery.length - 1)}px`,
			}}
		>
			<div className={styles.group}>
				{gallery.map(image => (
					<div
						className={styles.card}
						key={image.id}
					>
						<img
							src={image.url}
							alt=""
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								borderRadius: '8px',
							}}
						/>
					</div>
				))}
			</div>
			<div
				aria-hidden
				className={styles.group}
			>
				{gallery.map(image => (
					<div
						className={styles.card}
						key={image.id}
					>
						<img
							src={image.url}
							alt=""
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								borderRadius: '8px',
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
