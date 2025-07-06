import { FC } from 'react';

import clsx from 'clsx';

import { Stop, StopAddress } from 'entities/stop';
import { Trip } from 'entities/trip';
import { useDragAndDrop, useStopItem } from 'features/stops/model';
import { GripVertical, ThreeDots } from 'shared/assets';
import { useItemDropdown } from 'shared/lib';

import styles from './style.module.scss';

interface IStopItem {
	tripId: Trip['id'];
	stop: Stop;
	day?: string;
}

export const StopItem: FC<IStopItem> = ({ tripId, stop, day }) => {
	const { setNodeRef, dragStyle, attributes, listeners } = useDragAndDrop(stop);
	const { stopData, displayDay, onItemClick, onEditClick, onDeleteClick } =
		useStopItem(tripId, stop, day);

	const {
		isOpened: isMenuOpened,
		onClose: onCloseMenu,
		onToggle: onToggleMenu,
	} = useItemDropdown(stop.id);

	return (
		<div
			ref={setNodeRef}
			className={styles.stopItem}
			onClick={onItemClick}
			style={dragStyle}
			role="button"
			tabIndex={0}
			onKeyDown={onItemClick}
		>
			<p className={styles.text}>{displayDay}</p>
			<StopAddress stop={stopData} />
			<button
				onClick={onToggleMenu}
				className={styles.button}
			>
				<ThreeDots
					width={20}
					height={20}
				/>
			</button>
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
			<div
				className={clsx(styles.menu, isMenuOpened && styles.opened)}
				onClick={onCloseMenu}
				onKeyDown={onCloseMenu}
				role="button"
				tabIndex={0}
			>
				<button
					className={styles.menuButton}
					onClick={onEditClick}
				>
					Edit
				</button>
				<button
					className={styles.menuButton}
					onClick={onDeleteClick}
				>
					Delete
				</button>
			</div>
		</div>
	);
};
