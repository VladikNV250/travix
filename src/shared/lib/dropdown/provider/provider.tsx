import { FC, ReactNode, useState } from "react"
import { DropdownContext } from "./context";

interface IDropdownProvider {
    children: ReactNode
}

export const DropdownProvider: FC<IDropdownProvider> = ({ children }) => {
    const [openId, setOpenId] = useState<string | null>(null);

    const openMenu = (state: string | null) => {
        if (state === openId) {
            setOpenId(null);
        } else {
            setOpenId(state);
        }
    }

    const value = {
        openId,
        openMenu
    }

    return (
        <DropdownContext.Provider value={value}>
            {children}
        </DropdownContext.Provider>
    )
}