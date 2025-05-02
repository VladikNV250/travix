import { FC, useState } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./style.module.scss";
import { useAppSelector } from "shared/lib";
import { selectStops, StopForm, StopItem } from "features/stops";

const HomePage: FC = () => {
    const stops = useAppSelector(selectStops);
    const [isVisible, setIsVisible] = useState(false);

    const renderStopItems = () => {
        return stops.map((stop) =>
            <StopItem
                key={stop.id}
                stop={stop}
            />
        )
    }

    return (
        <nav className={styles.home}>
            {!isVisible ? (
                <div className={styles.homeContent}>
                    <button
                        className={styles.button}
                        onClick={() => setIsVisible(true)}
                    >
                        Add New Stop
                    </button>
                    <div className={styles.stopList}>
                        {renderStopItems()}
                    </div>
                </div>
            ) : (
                <StopForm onClose={() => setIsVisible(false)} />
            )}            
        </nav>
    )
}

export default HomePage;