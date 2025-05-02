import { Map } from "leaflet";
import { createContext } from "react";

interface IMapContext {
    map: Map | null;
    setMap: (map: Map) => void;
}

export const MapContext = createContext<IMapContext>(null!);