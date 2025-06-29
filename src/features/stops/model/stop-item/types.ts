import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Stop } from "entities/stop";
import { Trip } from "entities/trip";
import { CSSProperties, MouseEvent } from "react";

export interface IStopItemViewModelProps {
    tripId: Trip["id"];
    stop: Stop;
    day?: string;
}

export interface IStopItemViewModel {
    displayDay?: string; 
    stopData: Stop;
    dragStyle: CSSProperties;
    draggbleAttributes: DraggableAttributes;
    draggbleListeners: SyntheticListenerMap | undefined;
    setNodeRef: (node: HTMLElement | null) => void;
    isMenuOpened: boolean;

    onItemClick: () => void;
    onToggleMenu: (e: MouseEvent) => void;
    onCloseMenu: (e: MouseEvent) => void;
    onDeleteClick: () => void;
    onEditClick: () => void;
}