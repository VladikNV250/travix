import { useCallback, useMemo, useRef } from 'react';

import { Trip } from 'entities/trip';

import { generateShareCode } from '../utils/generateShareCode';

export const useShareCode = (trip: Trip | null) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const code = useMemo(() => generateShareCode(trip), [trip]);

	const copyCode = useCallback(() => {
		if (!code || !textareaRef.current) return;

		textareaRef.current.select();
		textareaRef.current.setSelectionRange(0, 99999);

		const shareMessage = `This is my trip! Copy code below and paste in Travix:\n\n${code}`;
		navigator.clipboard.writeText(shareMessage);
	}, [code]);

	return {
		textareaRef,
		code,
		copyCode,
	};
};
