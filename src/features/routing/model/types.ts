import { Route } from "entities/route";
import { Stop } from "entities/stop";

export interface RoutesState {
    routes: Record<string,Route>,
    activeRouteId: string | null,
    currentMarkerStop: Stop | null,
}