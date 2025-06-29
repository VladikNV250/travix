import { Stop } from "entities/stop";
import { LatLngExpression } from "leaflet";
import { MouseEvent } from "react";

export interface TripInfo {
    id: string;
    name: string;
    totalDistance: number;
    days: string[];
}

export interface TripAnimationControls {
    autocontinue: boolean;
    isCameraMounted: boolean;
    stops: LatLngExpression[];
    onToggleAutocontinue: () => void;
    onToggleCameraMounted: () => void;
}

export interface ITripPageViewModel {
    trip: TripInfo | null;
    displayStops: Stop[];
    isOpenStopForm: boolean;
    dayView: boolean;
    animationControls: TripAnimationControls;
    isTripMenuOpened: boolean;
    onCloseStopForm: () => void;
    onOpenStopForm: () => void;
    onToggleDayView: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
    onSetStopsOrder: (newStops: Stop[]) => void;
    onToggleTripMenu: (e: MouseEvent) => void;
    onCloseTripMenu: (e: MouseEvent) => void;
}