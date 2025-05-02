import { Stop, StopAddress } from "entities/stop";
import { FC } from "react";
import styles from "./style.module.scss";
import { ThreeDots } from "shared/assets";
import clsx from "clsx";
import { useAppDispatch, useDropdown } from "shared/lib";
import { removeStop } from "features/stops/model/stopsSlice";

interface IStopItem {
    stop: Stop
}

export const StopItem: FC<IStopItem> = ({ stop }) => {
    const dispatch = useAppDispatch();
    const { openId, openMenu } = useDropdown(); 

    return (
        <div 
            className={styles.stopItem}
        >
            <StopAddress stop={stop} />
            <button 
                onClick={() => openMenu(stop.id)} 
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
                <button className={styles.menuButton}>
                    Edit
                </button>
                <button
                    onClick={() => dispatch(removeStop(stop))} 
                    className={styles.menuButton}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}