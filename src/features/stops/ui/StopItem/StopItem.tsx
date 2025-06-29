import { FC } from "react";
import { Trip } from "entities/trip";
import { 
    Stop, 
    StopAddress 
} from "entities/stop";
import { 
    GripVertical, 
    ThreeDots 
} from "shared/assets";
import { useStopItemViewModel } from "features/stops/model";
import clsx from "clsx";
import styles from "./style.module.scss";

interface IStopItem {
    tripId: Trip["id"];
    stop: Stop;
    day?: string;
}

export const StopItem: FC<IStopItem> = ({tripId, stop, day }) => {
    const {
        stopData,
        displayDay,
        dragStyle,
        draggbleAttributes,
        draggbleListeners,
        setNodeRef,
        isMenuOpened,
        onItemClick,
        onToggleMenu,
        onCloseMenu,
        onEditClick,
        onDeleteClick,
    } = useStopItemViewModel({
        tripId,
        stop,
        day
    });

    return (
        <div 
            ref={setNodeRef}
            className={styles.stopItem}
            onClick={onItemClick}
            style={dragStyle}
        >
            <p className={styles.text}>
                {displayDay}
            </p>
            <StopAddress stop={stopData} />
            <button 
                onClick={onToggleMenu} 
                className={styles.button}
            >  
                <ThreeDots width={20} height={20} />
            </button>
            <button 
                className={styles.dragButton} 
                {...draggbleAttributes} 
                {...draggbleListeners}
            >
                <GripVertical width={20} height={20} />
            </button>
            <div 
                className={clsx(
                    styles.menu,
                    isMenuOpened && styles.opened
                )}
                onClick={onCloseMenu}
            >
                <button 
                    className={styles.menuButton}
                    onClick={onEditClick}
                >
                    Edit
                </button>
                <button
                    className={styles.menuButton}
                    onClick={onDeleteClick} 
                >
                    Delete
                </button>
            </div>
        </div>
    )
}