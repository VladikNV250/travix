import { ReactNode } from 'react';

import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	UniqueIdentifier,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface DndWrapperProps<T extends { id: UniqueIdentifier }> {
	readonly children: ReactNode;
	readonly items: T[];
	readonly setItems: (items: T[]) => void;
}

export const DndWrapper = <T extends { id: UniqueIdentifier }>({
	items,
	setItems,
	children,
}: DndWrapperProps<T>) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!items) return;

		if (active.id !== over?.id) {
			const oldIndex = items.findIndex(item => item.id === active.id);
			const newIndex = items.findIndex(item => item.id === over?.id);
			setItems(arrayMove(items, oldIndex, newIndex));
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={items}
				strategy={verticalListSortingStrategy}
			>
				{children}
			</SortableContext>
		</DndContext>
	);
};
