import { FC } from "react";
import { Link } from "react-router";
import { useMap } from "features/map";
import { removeStop } from "features/trip";
import { Trip } from "entities/trip";
import { Stop, StopAddress } from "entities/stop";
import { GripVertical, ThreeDots } from "shared/assets";
import { 
    useAppDispatch, 
    useDropdown 
} from "shared/lib";
import clsx from "clsx";
import styles from "./style.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IStopItem {
    tripId: Trip["id"];
    stop: Stop;
    day?: string;
}

export const StopItem: FC<IStopItem> = ({tripId, stop, day }) => {
    const dispatch = useAppDispatch();
    const { openId, openMenu } = useDropdown(); 
    const { map } = useMap();
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({ id: stop.id });

    const dragStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div 
            ref={setNodeRef}
            className={styles.stopItem}
            onClick={() => map?.flyTo(stop.location, 10, {animate: true})}
            style={dragStyle}
        >
            <p className={styles.text}>
                {day ?? ""}
            </p>
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
            <button className={styles.dragButton} {...attributes} {...listeners}>
                <GripVertical width={20} height={20} />
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