import { FC } from 'react';
import { Link } from 'react-router';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { GripVertical } from 'shared/assets';

import { Trip } from '../model/types';
import styles from './style.module.scss';

interface ITripItem {
	readonly trip: Trip;
}

export const TripItem: FC<ITripItem> = ({ trip }) => {
	const { setNodeRef, attributes, listeners, transform, transition } =
		useSortable({ id: trip.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={styles.trip}
		>
			<Link
				className={styles.link}
				to={`/trip/${trip.id}`}
			>
				{trip.name}
			</Link>
			<button
				className={styles.dragButton}
				{...attributes}
				{...listeners}
			>
				<GripVertical
					width={20}
					height={20}
				/>
			</button>
		</div>
	);
};
