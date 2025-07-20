import { FC } from 'react';

import clsx from 'clsx';

import { Stop, StopAddress } from 'entities/stop';
import { Trip } from 'entities/trip';
import { useDragAndDrop, useStopItem } from 'features/stops/model';
import { GripVerticalIcon, ThreeDotsIcon } from 'shared/assets';
import { useItemDropdown } from 'shared/lib';

interface StopItemProps {
	tripId: Trip['id'];
	stop: Stop;
	day?: string;
}

export const StopItem: FC<StopItemProps> = ({ tripId, stop, day }) => {
	const { setNodeRef, dragStyle, attributes, listeners } = useDragAndDrop(stop);
	const { stopData, displayDay, onItemClick, onEditClick, onDeleteClick } =
		useStopItem(tripId, stop, day);

	const {
		isOpened: isMenuOpened,
		onClose: onCloseMenu,
		onToggle: onToggleMenu,
	} = useItemDropdown(`${stop.id}-${stop.address}`);

	return (
		<div
			ref={setNodeRef}
			className="relative grid cursor-pointer grid-cols-[auto_1fr_auto_auto] items-center gap-2 bg-neutral-300 px-2.5 py-1.5"
			onClick={onItemClick}
			style={dragStyle}
			role="button"
			tabIndex={0}
			onKeyDown={onItemClick}
		>
			<p>{displayDay}</p>
			<StopAddress stop={stopData} />
			<button
				onClick={onToggleMenu}
				className="relative flex"
			>
				<ThreeDotsIcon
					width={20}
					height={20}
				/>
			</button>
			<button
				className="cursor-grab text-black"
				{...attributes}
				{...listeners}
			>
				<GripVerticalIcon
					width={20}
					height={20}
				/>
			</button>
			<div
				className={clsx(
					'absolute top-0 left-full w-25 bg-neutral-200',
					isMenuOpened ? 'flex flex-col' : 'hidden',
				)}
				onClick={onCloseMenu}
				onKeyDown={onCloseMenu}
				role="button"
				tabIndex={0}
			>
				<button
					className="flex w-full p-2 text-sm text-black hover:bg-zinc-300"
					onClick={onEditClick}
				>
					Edit
				</button>
				<button
					className="flex w-full p-2 text-sm text-black hover:bg-zinc-300"
					onClick={onDeleteClick}
				>
					Delete
				</button>
			</div>
		</div>
	);
};
