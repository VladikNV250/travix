import { FC } from "react";
import { TripContinueButton } from "features/trip-animation";
import { StopSliderGallery } from "entities/stop";
import { SimpleLoader } from "shared/ui";
import { useStopInfoViewModel } from "widgets/stop-info-panel/model";
import clsx from "clsx";
import styles from "./style.module.scss";


export const StopInfoPanel: FC = () => {
    const { hasStop, stopInfo, weather, holiday } = useStopInfoViewModel();

    return (
        <div 
            className={clsx(
                styles.stopInfoPanel,
                hasStop && styles.active
            )}
        >
            {hasStop && stopInfo && (
                <>
                    <header className={styles.header}>
                        <div className={styles.titleContainer}>
                            <h3 className={styles.title}>
                                {stopInfo.title}
                            </h3>
                            <h4>
                                {stopInfo.subtitle}
                            </h4>
                        </div>
                        <TripContinueButton />
                    </header>
                    <div className={styles.widgetContainer}>
                        <div className={styles.infoWidget}>
                            <header className={styles.infoHeader}>
                                <h4 className={styles.infoTitle}>
                                    Weather
                                </h4>
                                <h4 className={styles.infoSubtitle}>
                                    On {weather.date}
                                </h4>
                            </header>
                            {weather.type === "loading" && (<SimpleLoader loading={true} />)}
                            {weather.type === "data" && (
                                <div className={styles.weatherContainer}>
                                    <div className={styles.temperatureContainer}>
                                        <p className={styles.temperature}>
                                            {weather.data.temperature}&#8451;
                                        </p>
                                        <p className={styles.condition}>
                                            {weather.data.condition}
                                        </p>
                                    </div>
                                    <img 
                                        src={weather.data.icon} 
                                        alt={weather.data.condition} 
                                        className={styles.conditionIcon}
                                    />
                                </div>
                            )} 
                            {weather.type === "unavailable" &&(
                                <p className={styles.condition}>
                                    Weather is temporarily unavailable
                                </p>
                            )}
                        </div>
                        <div className={styles.infoWidget}>
                            <h4 className={styles.infoTitle}>
                                Holidays
                            </h4>
                            {holiday.type === "loading" && (<SimpleLoader loading={true} />)}
                            {holiday.type === "data" && (
                                <p className={styles.infoSubtitle}>
                                    {holiday.data.name}
                                </p>
                            )}
                            {holiday.type === "unavailable" && (
                                <p className={styles.infoSubtitle}>
                                    There are no holidays on this date
                                </p>
                            )}
                        </div>
                        <div className={styles.infoWidget}>
                            <h4 className={styles.infoTitle}>
                                Notes 
                            </h4>
                            <p className={styles.notes}>
                                {stopInfo.notes}
                            </p>
                        </div>
                    </div>
                    <StopSliderGallery gallery={stopInfo.images} />
                </>
            )}
        </div>
    )
}