import { useState } from 'react';

export const useTripShare = () => {
	const [isOpen, setIsOpen] = useState(false);

	return {
		popupIsOpen: isOpen,
		closePopup: () => setIsOpen(false),
		openPopup: () => setIsOpen(true),
	};
};
