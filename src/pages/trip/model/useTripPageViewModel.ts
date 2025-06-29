import { Stop } from "entities/stop";
import { useMap } from "features/map";
import { selectRoute } from "features/routing";
import { calculateTripDays } from "features/stops";
import { removeTrip, selectTrip, setStops } from "features/trip";
import { useInitTripAnimator, useTripAnimatorState } from "features/trip-animation";
import { latLng } from "leaflet";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useAppDispatch, useAppSelector, useItemDropdown } from "shared/lib";
import { ITripPageViewModel, TripAnimationControls, TripInfo } from "./types";

export const useTripPageViewModel = (): ITripPageViewModel => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tripId } = useParams<{ tripId: string }>();
    const { map } = useMap();

    const trip = useAppSelector(selectTrip(tripId ?? ""));
    const route = useAppSelector(selectRoute(tripId ?? ""));

    const [isOpenStopForm, setIsOpenStopForm] = useState<boolean>(false);
    const [dayView, setDayView] = useState<boolean>(false);

    const tripAnimator = useInitTripAnimator(map, route, trip?.stops);
    const [autocontinue, setAutocontinue] = useTripAnimatorState(tripAnimator, "autocontinue", true);
    const [isCameraMounted, setIsCameraMounted] = useTripAnimatorState(tripAnimator, "isCameraMounted", true);

    const {
        isOpened: isTripMenuOpened,
        onToggle: onToggleTripMenu,
        onClose: onCloseTripMenu,
    } = useItemDropdown(tripId ?? null);
    

    const totalDistance = useMemo(
        () => trip?.stops.slice(0, -1).reduce((total, stop, index) => {
            const nextStop = trip.stops[index + 1];
            return total + (nextStop ? latLng(stop.location).distanceTo(nextStop.location) : 0)
        }, 0) ?? 0, 
        [trip?.stops]
    )

    const tripDays = useMemo(
        () => calculateTripDays(trip?.stops ?? []), 
        [trip?.stops]
    )

    const routeStops = useMemo(
        () => trip?.stops.map(stop => stop.location) ?? [], 
        [trip]
    )

    const displayStops = useMemo(() => {
        if (dayView && trip?.stops) {
            const sortedStops = [...trip.stops];
            sortedStops.sort((a, b) => {
                const arrivalA = new Date(a.arrivalDate);
                const arrivalB = new Date(b.arrivalDate);
                return arrivalA.getTime() - arrivalB.getTime();
            })
            return sortedStops;
        } 
        return trip?.stops ?? [];
    }, [dayView, trip?.stops])

    const tripInfo: TripInfo | null = useMemo(() => {
        if (!trip) return null;
        return {
            id: trip.id ?? "",
            name: trip.name ?? "",
            totalDistance: Math.floor(totalDistance / 1000),
            days: tripDays
        }
    }, [totalDistance, trip, tripDays]);

    const onEditClick = useCallback(() => {
        navigate(`/trip/${trip?.id}/edit`);
    }, [navigate, trip?.id])

    const onDeleteClick = useCallback(() => {
        dispatch(removeTrip(trip ?? null));
        navigate("/");
    }, [dispatch, navigate, trip]);

    const onSetStopsOrder = useCallback((newStops: Stop[]) => {
        dispatch(setStops({
            tripId: trip?.id ?? "",
            stops: newStops
        }))
    }, [dispatch, trip?.id]);

    const onCloseStopForm = useCallback(() => setIsOpenStopForm(false), []);
    const onOpenStopForm = useCallback(() => setIsOpenStopForm(true), []);
    const onToggleDayView = useCallback(() => setDayView(prev => !prev), []);
    const onToggleAutocontinue = useCallback(() => setAutocontinue(prev => !prev), [setAutocontinue]);
    const onToggleCameraMounted = useCallback(() => setIsCameraMounted(prev => !prev), [setIsCameraMounted]);

    const animationControls: TripAnimationControls = {
        autocontinue,
        isCameraMounted,
        stops: routeStops,
        onToggleAutocontinue,
        onToggleCameraMounted,
    }

    return {
        trip: tripInfo,
        displayStops,
        isOpenStopForm,
        dayView,
        animationControls,
        isTripMenuOpened,
        onToggleTripMenu,
        onCloseTripMenu,
        onOpenStopForm,
        onCloseStopForm,
        onToggleDayView,
        onEditClick,
        onDeleteClick,
        onSetStopsOrder,
    }
}