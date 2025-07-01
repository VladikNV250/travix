import { useMemo } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Stop } from 'entities/stop';

// TODO: Move it somewhere else
export const useDragAndDrop = (stop: Stop) => {
	const { setNodeRef, attributes, listeners, transform, transition } =
		useSortable({ id: stop.id });

	const dragStyle = useMemo(
		() => ({
			transform: CSS.Transform.toString(transform),
			transition,
		}),
		[transform, transition],
	);

	return {
		setNodeRef,
		attributes,
		listeners,
		dragStyle,
	};
};
