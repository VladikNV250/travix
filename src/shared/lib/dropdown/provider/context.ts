import { createContext } from 'react';

interface DropdownContext {
	openId: string | null;
	openMenu: (state: string | null) => void;
}

export const DropdownContext = createContext<DropdownContext>(null!);
