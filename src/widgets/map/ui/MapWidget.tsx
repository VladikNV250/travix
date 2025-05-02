import { FC } from "react";
import { 
    MapContainer, 
    Marker, 
    Popup, 
    TileLayer 
} from "react-leaflet";
import { selectStops } from "features/stops";
import { 
    useAppSelector 
} from "shared/lib";
import { useMap } from "features/map";
import { Icon } from "leaflet";
import { PointRed } from "shared/assets";


export const MapWidget: FC = () => {
    const stops = useAppSelector(selectStops);
    const { setMap } = useMap();

    const icon = new Icon({
        iconUrl: PointRed,
        iconSize: [20, 20],
    }) 

    const renderStops = () => {
        if (stops.length > 0) {
            return stops.map((stop, index) => 
                <Marker
                    key={index}
                    position={[
                        stop.location.lat,
                        stop.location.lng
                    ]}
                    icon={icon}
                >
                    <Popup>
                        {stop.address}
                    </Popup>
                </Marker>
            )
        }
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
        </MapContainer>
    )
} 