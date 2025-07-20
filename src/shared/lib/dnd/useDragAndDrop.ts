import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const useDragAndDrop = (id: string) => {
	const { setNodeRef, attributes, listeners, transform, transition } =
		useSortable({ id });

	const dragStyle = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return {
		setNodeRef,
		attributes,
		listeners,
		dragStyle,
	};
};
