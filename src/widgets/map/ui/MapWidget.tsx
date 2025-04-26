import { Map } from "leaflet";
import { Dispatch, FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface IMapWidget {
    readonly ref: Dispatch<React.SetStateAction<Map | null>>;
}

export const MapWidget: FC<IMapWidget> = ({ ref }) => {
    return (
        <MapContainer 
            center={[51.505, 0]} 
            zoom={3} 
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            ref={ref}
        >
            <TileLayer
                crossOrigin="anonymous"
                attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
                url="https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=4ef7271267c746e98ce4774b30eac8fd"
            />
        </MapContainer>
    )
} 