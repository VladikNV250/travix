import { useCallback, useMemo, useRef } from 'react';

import { Trip } from 'entities/trip';
import { SHARE_MESSAGE } from 'features/share-trip/config';

import { generateShareCode } from '../utils/generateShareCode';

export const useShareCode = (trip: Trip | null) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const code = useMemo(() => generateShareCode(trip), [trip]);

	const copyCode = useCallback(() => {
		if (!code || !textareaRef.current) return;

		textareaRef.current.select();
		textareaRef.current.setSelectionRange(0, 99999);

		const shareMessageWithCode = `${SHARE_MESSAGE}\n\n${code}`;
		navigator.clipboard.writeText(shareMessageWithCode);
	}, [code]);

	return {
		textareaRef,
		code,
		copyCode,
	};
};
