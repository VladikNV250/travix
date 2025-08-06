import { FC } from 'react';

import { Stop, StopItem } from 'entities/stop';
import { ActionsButton } from 'features/stop-control';

interface StopCardProps {
	stop: Stop;
	order: number;
	isLast?: boolean;
}

export const StopCard: FC<StopCardProps> = ({ stop, order, isLast }) => {
	return (
		<StopItem
			stop={stop}
			order={order}
			isLast={isLast}
			actionSlot={<ActionsButton />}
		/>
	);
};
