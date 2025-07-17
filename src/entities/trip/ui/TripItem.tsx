import { FC } from 'react';
import { Link } from 'react-router';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { GripVerticalIcon } from 'shared/assets';

import { Trip } from '../model/types';

interface TripItemProps {
	readonly trip: Trip;
}

export const TripItem: FC<TripItemProps> = ({ trip }) => {
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
			className="flex min-w-50 items-center justify-between gap-7.5 bg-blue-800 px-4 py-2 font-medium tracking-wide"
		>
			<Link
				className="text-white"
				to={`/trip/${trip.id}`}
			>
				{trip.name}
			</Link>
			<button
				className="cursor-grab text-zinc-200"
				{...attributes}
				{...listeners}
			>
				<GripVerticalIcon
					width={20}
					height={20}
				/>
			</button>
		</div>
	);
};
