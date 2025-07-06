import { createContext } from 'react';

interface IDropdownContext {
	openId: string | null;
	openMenu: (state: string | null) => void;
}

export const DropdownContext = createContext<IDropdownContext>(null!);
