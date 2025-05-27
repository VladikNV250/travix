import { FC } from "react"
import { 
    DivIcon, 
    Icon, 
    IconOptions, 
    latLng 
} from "leaflet"
import { 
    Marker, 
    Popup 
} from "react-leaflet"
import { useWeather } from "entities/weather"
import { Stop } from "entities/stop"
import { formatDate } from "shared/lib"
import styles from "./style.module.scss";
import { SimpleLoader } from "shared/ui"
import { useHoliday } from "entities/holidays"

interface IStopMarker {
    stop: Stop,
    icon?: Icon<IconOptions> | DivIcon
}

export const StopMarker: FC<IStopMarker> = ({ stop, icon }) => {
    const { weather, loading: weatherLoading, getWeather } = useWeather();
    const { holiday, loading: holidayLoading, getHoliday } = useHoliday();

    const updateStopInfo = async (stop: Stop) => {
        const stopDate = new Date(stop.arrivalDate || Date.now());

        const latlng = latLng(stop.location);
        const latlngStr = `${latlng.lat},${latlng.lng}`;
        await getWeather(latlngStr, stopDate);

        if (stop.countryCode) {
            await getHoliday(stop.countryCode, stopDate);
        }
    }

    return (
        <Marker
            position={stop.location}
            icon={icon}
            eventHandlers={{
                click: async () => await updateStopInfo(stop)
            }}
        >
            <Popup>
                <div className={styles.popupContent}>
                    {holiday && (
                        <div className={styles.balloonWrapper}>
                            <div className={styles.balloon} />
                            <div className={styles.balloon} />
                            <div className={styles.balloon} />
                        </div>
                    )}
                    <h4 className={styles.address}>
                        {stop.address}
                    </h4>
                    {holidayLoading || weatherLoading ? (
                        <SimpleLoader loading={holidayLoading || weatherLoading} />
                    ) : (
                        <>
                            <div className={styles.horizontalLine} />
                            <h4 className={styles.popupTitle}>Weather</h4>
                            <p className={styles.popupSubtitle}>
                                {`On ${formatDate(new Date(stop.arrivalDate || Date.now()))}`}
                            </p>
                            {weather ? (
                                <div className={styles.weatherContainer}>
                                    <div className={styles.temperatureContainer}>
                                        <img 
                                            src={weather.icon} 
                                            alt={weather.condition} 
                                            className={styles.conditionIcon}
                                        />
                                        <p className={styles.temperature}>
                                            {Math.floor(weather.temperature)}&#8451;
                                        </p>
                                    </div>
                                    <p className={styles.condition}>
                                        {weather.condition}
                                    </p>
                                </div>
                            ) : (
                                <p className={styles.condition}>
                                    Weather is temporarily unavailable
                                </p>
                            )}
                            <div className={styles.horizontalLine} />
                            <h4 className={styles.popupTitle}>Holidays</h4>
                            {holiday ? (
                                <p className={styles.popupSubtitle}>
                                    {holiday.name}
                                </p>
                            ) : (
                                <p className={styles.popupSubtitle}>
                                    There are no holidays on this date
                                </p>
                            )}
                        </>
                    )}
                </div>
            </Popup>
        </Marker>
    )
}