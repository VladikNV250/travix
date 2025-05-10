import { FC } from "react";
import { 
    MapContainer, 
    Marker, 
    Popup, 
    TileLayer 
} from "react-leaflet";
import { 
    useAppSelector 
} from "shared/lib";
import { useMap } from "features/map";
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { selectTrips } from "features/trip";
import { RoutingMachine } from "features/routing";
import { Point } from "shared/assets";
import { renderToString } from "react-dom/server";
import styles from "./style.module.scss";


export const MapWidget: FC = () => {
    const trips = useAppSelector(selectTrips);
    const { setMap } = useMap();

    

    const renderStops = () => {
        if (trips.length > 0) {
            return trips.map((trip) => {
                const icon = new DivIcon({
                    html: renderToString(<Point width={20} height={20} style={{color: trip.color}} />),
                    iconSize: [20, 20],
                    className: styles.marker
                })

                if (trip.stops.length > 0) {
                    return trip.stops.map(stop => 
                        <Marker
                            key={stop.id}
                            position={stop.location}
                            icon={icon}
                        >
                            <Popup>
                                {stop.address}
                            </Popup>
                        </Marker>
                    )
                }
            })
        }
    }

    const renderRoutes = () => {
        return trips.map(trip => {
            const waypoints = trip.stops.map(stop => stop.location);

            return <RoutingMachine key={trip.id} waypoints={waypoints} color={trip.color} />
        })
    }

    return (
        <MapContainer 
            center={[51.505, 0]} 
            zoom={3} 
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            ref={setMap}
        >
            <TileLayer
                crossOrigin="anonymous"
                attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
                url="https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=4ef7271267c746e98ce4774b30eac8fd"
            />
            {renderStops()}
            {renderRoutes()}
        </MapContainer>
    )
} 