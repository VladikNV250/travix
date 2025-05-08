import { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector, useDropdown } from "shared/lib";
import { removeTrip, selectTrips } from "features/trip";
import { StopForm, StopItem } from "features/stops";
import styles from "./style.module.scss";
import { ChevronLeft, ThreeDots } from "shared/assets";
import clsx from "clsx";


const TripPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tripId } = useParams();
    const trips = useAppSelector(selectTrips);
    const trip = trips.find(trip => trip.id === tripId);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { openId, openMenu } = useDropdown();
    

    const handleDelete = () => {
        dispatch(removeTrip(trip ?? null));
        navigate("/");
    }

    const renderStops = () => {
        return trip?.stops.map(stop =>
            <StopItem 
                key={stop.id}
                stop={stop}
                tripId={tripId ?? ""}
            />
        )
    }
    
    return (
        <div className={styles.trip}>
            {!isOpen ? (
                <>
                    <header className={styles.tripHeader}>
                        <Link to="/" className={styles.headerButton}>
                            <ChevronLeft width={20} height={20} />
                        </Link>
                        <h3 className={styles.tripTitle}>
                            {trip?.name ?? ""}
                        </h3>
                        <div 
                            role="button" 
                            className={styles.headerButton}
                            onClick={() => openMenu(trip?.id ?? null)}
                        >
                            <ThreeDots width={20} height={20} />
                            <div 
                                className={clsx(
                                    styles.menu,
                                    openId === trip?.id && styles.opened
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openMenu(null);
                                }}
                            >
                                <Link 
                                    to={`/trip/${tripId}/edit`}
                                    className={styles.menuButton}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete} 
                                    className={styles.menuButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </header>
                    <button
                        onClick={() => setIsOpen(true)}
                        className={styles.button}
                    >
                        Add New Stop
                    </button>
                    <div className={styles.stopList}>
                        {renderStops()}
                    </div>
                </>
            ) : (
                <StopForm 
                    tripId={trip?.id ?? ""} 
                    onClose={() => setIsOpen(false)}  
                />
            )}
        </div>
    )
}

export default TripPage;