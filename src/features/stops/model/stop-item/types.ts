import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';

export interface UseStopItemProps {
	tripId: Trip['id'];
	stop: Stop;
	day?: string;
}

export interface UseStopItemHookResult {
	stopData: Stop;
	displayDay?: string;

	onDeleteClick: () => void;
	onEditClick: () => void;
	onItemClick: () => void;
}

export interface UseDragAndDropHookResult {
	setNodeRef: (node: HTMLElement | null) => void;
	attributes: DraggableAttributes;
	listeners?: SyntheticListenerMap;
	dragStyle: {
		transform?: string;
		transition?: string;
	};
}
