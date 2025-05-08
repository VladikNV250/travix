import { FC } from "react";
import { Link } from "react-router";
import { useMap } from "features/map";
import { removeStop } from "features/trip";
import { Trip } from "entities/trip";
import { Stop, StopAddress } from "entities/stop";
import { ThreeDots } from "shared/assets";
import { 
    useAppDispatch, 
    useDropdown 
} from "shared/lib";
import clsx from "clsx";
import styles from "./style.module.scss";

interface IStopItem {
    tripId: Trip["id"];
    stop: Stop;
}

export const StopItem: FC<IStopItem> = ({tripId, stop }) => {
    const dispatch = useAppDispatch();
    const { openId, openMenu } = useDropdown(); 
    const { map } = useMap();


    return (
        <div 
            className={styles.stopItem}
            onClick={() => map?.flyTo(stop.location, 10, {animate: true})}
        >
            <StopAddress stop={stop} />
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    openMenu(stop.id)
                }} 
                className={styles.button}
            >  
                <ThreeDots width={20} height={20} />
            </button>
            <div 
                className={clsx(
                    styles.menu,
                    openId === stop.id && styles.opened
                )}
                onClick={(e) => {
                    e.stopPropagation();
                    openMenu(null);
                }}
            >
                <Link 
                    to={`/trip/${tripId}/stop/${stop.id}`}
                    className={styles.menuButton}
                >
                    Edit
                </Link>
                <button
                    onClick={() => dispatch(removeStop({tripId, stop}))} 
                    className={styles.menuButton}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}