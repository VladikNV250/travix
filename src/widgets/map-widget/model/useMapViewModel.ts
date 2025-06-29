import { selectTrips } from "features/trip";
import { useAppSelector } from "shared/lib";
import { IMapViewModel, MapMarkerData, MapRouteData } from "./types";
import { useCallback, useMemo } from "react";
import { createMarkerIcon } from "../lib";
import { Map } from "leaflet";
import { useMap } from "features/map";

export const useMapViewModel = (): IMapViewModel => {
    const trips = useAppSelector(selectTrips);
    const { setMap } = useMap();

    const markers: MapMarkerData[] = useMemo(() => {
        if (trips.length === 0) return [] 
            
        return trips.flatMap(trip => {
            const icon = createMarkerIcon(trip.color || "#ff0000");
            if (trip.stops.length === 0) return [];
            return trip.stops.map(stop => ({
                key: stop.id,
                stop,
                icon,
            }))
        })
    }, [trips])

    const routes: MapRouteData[] = useMemo(() => {
        return trips.map(trip => ({
            key: trip.id,
            trip
        }));
    }, [trips]);

    const onMapLoad = useCallback((mapInstance: Map) => {
        setMap(mapInstance)
    }, [setMap]);

    return {
        initialCenter: [51.505, 0],
        initialZoom: 3,
        markers,
        routes,
        onMapLoad
    }
}