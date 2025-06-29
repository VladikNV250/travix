import { useSortable } from "@dnd-kit/sortable";
import { useMap } from "features/map";
import { useAppDispatch, useItemDropdown } from "shared/lib";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useMemo } from "react";
import { IStopItemViewModel, IStopItemViewModelProps } from "./types";
import { removeStop } from "features/trip";
import { useNavigate } from "react-router";

export const useStopItemViewModel = ({
    stop,
    tripId,
    day
}: IStopItemViewModelProps): IStopItemViewModel => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { map } = useMap();
    
    const {
        isOpened: isMenuOpened,
        onClose: onCloseMenu,
        onToggle: onToggleMenu 
    } = useItemDropdown(stop.id);
    
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({ id: stop.id });

    const dragStyle = useMemo(
        () => ({
        transform: CSS.Transform.toString(transform),
        transition,
    }), [transform, transition]);

    const onItemClick = useCallback(() => {
        map?.flyTo(stop.location, 10, {animate: true})
    }, [map, stop.location]);

    const onDeleteClick = useCallback(() => {
        dispatch(removeStop({tripId, stop}))
    }, [dispatch, stop, tripId]);

    const onEditClick = useCallback(() => {
        navigate(`/trip/${tripId}/stop/${stop.id}`);
    }, [tripId, stop.id, navigate]);

    return {
        stopData: stop,
        displayDay: day || "",
        dragStyle,
        draggbleAttributes: attributes,
        draggbleListeners: listeners,
        isMenuOpened,
        onCloseMenu,
        onToggleMenu,
        onDeleteClick,
        onEditClick,
        onItemClick,
        setNodeRef
    }
}