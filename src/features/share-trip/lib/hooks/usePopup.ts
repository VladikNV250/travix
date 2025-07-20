import { useState } from 'react';

export const usePopup = () => {
	const [isOpen, setIsOpen] = useState(false);

	return {
		isOpen: isOpen,
		close: () => setIsOpen(false),
		open: () => setIsOpen(true),
	};
};
