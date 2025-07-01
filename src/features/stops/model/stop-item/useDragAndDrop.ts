import { useMemo } from 'react';

import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Stop } from 'entities/stop';

interface UseDragAndDropProps {
	stop: Stop;
}

interface UseDragAndDropResult {
	setNodeRef: (node: HTMLElement | null) => void;
	attributes: DraggableAttributes;
	listeners?: SyntheticListenerMap;
	dragStyle: {
		transform?: string;
		transition?: string;
	};
}

// TODO: Move it somewhere else
export const useDragAndDrop = ({
	stop,
}: UseDragAndDropProps): UseDragAndDropResult => {
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
