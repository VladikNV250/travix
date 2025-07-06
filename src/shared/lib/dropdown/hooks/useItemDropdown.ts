import { KeyboardEvent, MouseEvent, useCallback, useMemo } from 'react';

import { useDropdown } from '../provider/useDropdown';

export const useItemDropdown = (itemId: string | null) => {
	const { openId, openMenu } = useDropdown();

	const isOpened = useMemo(() => openId === itemId, [openId, itemId]);

	const onToggle = useCallback(
		(e: MouseEvent | KeyboardEvent) => {
			e.stopPropagation();
			openMenu(isOpened ? null : itemId);
		},
		[isOpened, itemId, openMenu],
	);

	const onClose = useCallback(
		(e: MouseEvent | KeyboardEvent) => {
			e.stopPropagation();
			openMenu(null);
		},
		[openMenu],
	);

	return {
		isOpened,
		onToggle,
		onClose,
	};
};
