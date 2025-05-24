import { FC, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { DndWrapper, useAppDispatch, useAppSelector, useDropdown } from "shared/lib";
import { removeTrip, selectTrips, setStops } from "features/trip";
import { calculateTripDays, StopForm, StopItem } from "features/stops";
import styles from "./style.module.scss";
import { CalendarDate, ChevronLeft, ThreeDots } from "shared/assets";
import clsx from "clsx";


const TripPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tripId } = useParams();
    const trips = useAppSelector(selectTrips);
    const trip = trips.find(trip => trip.id === tripId);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { openId, openMenu } = useDropdown();
    const [dayView, setDayView] = useState<boolean>(false);
    const tripDays = useMemo(
        () => calculateTripDays(trip?.stops ?? []),
        [trip?.stops]
    )
    

    const handleDelete = () => {
        dispatch(removeTrip(trip ?? null));
        navigate("/");
    }

    const renderStops = () => {
        if (dayView) {
            const sortedStops = trip?.stops.sort((a, b) => {
                const arrivalA = new Date(a.arrivalDate);
                const arrivalB = new Date(b.arrivalDate);

                return arrivalA.getTime() - arrivalB.getTime();
            })

            return sortedStops?.map((stop, index) =>
                <StopItem 
                    key={stop.id}
                    stop={stop}
                    tripId={tripId ?? ""}
                    day={tripDays[index]}
                />
            )
        } else {
            return trip?.stops.map((stop) =>
                <StopItem 
                    key={stop.id}
                    stop={stop}
                    tripId={tripId ?? ""}
                />
            )
        }
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
                        <button 
                            title="Day View" 
                            onClick={() => setDayView(!dayView)}
                            className={clsx(
                                dayView && styles.dayView,
                            )}
                        >
                            <CalendarDate width={20} height={20} />
                        </button>
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
                    <DndWrapper
                        items={trip?.stops ?? []}
                        setItems={(newStops) => dispatch(setStops({tripId: trip?.id ?? "", stops: newStops}))}
                    >
                        <div className={styles.stopList}>
                            {renderStops()}
                        </div>
                    </DndWrapper>
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