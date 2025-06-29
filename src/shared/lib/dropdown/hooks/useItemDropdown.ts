import { MouseEvent, useCallback, useMemo } from "react";
import { useDropdown } from "../provider/useDropdown";

interface IItemDropdown {
    isOpened: boolean;
    onToggle: (e: MouseEvent) => void;
    onClose: (e: MouseEvent) => void;
}

export const useItemDropdown = (itemId: string | null): IItemDropdown => {
    const { openId, openMenu } = useDropdown();

    const isOpened = useMemo(() => openId === itemId, [openId, itemId]);

    const onToggle = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        openMenu(isOpened ? null : itemId);
    }, [isOpened, itemId, openMenu]);

    const onClose = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        openMenu(null);
    }, [openMenu]);

    return {
        isOpened,
        onToggle,
        onClose
    }
}