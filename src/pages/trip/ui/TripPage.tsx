import { FC } from "react";
import { Link } from "react-router";
import { 
    TripPlayButton, 
    TripStopButton 
} from "features/trip-animation";
import { 
    StopForm, 
    StopItem 
} from "features/stops";
import { DndWrapper } from "shared/lib";
import { 
    CalendarDate, 
    ChevronLeft, 
    ThreeDots 
} from "shared/assets";
import { useTripPageViewModel } from "../model";
import clsx from "clsx";
import styles from "./style.module.scss";


const TripPage: FC = () => {
    const {
        trip,
        displayStops,
        isOpenStopForm,
        dayView,
        animationControls,
        isTripMenuOpened,
        onToggleTripMenu,
        onCloseTripMenu,
        onCloseStopForm,
        onOpenStopForm,
        onToggleDayView,
        onEditClick,
        onDeleteClick,
        onSetStopsOrder,
    } = useTripPageViewModel();

    return (
        <div className={styles.trip}>
            {!isOpenStopForm ? (
                <>
                    <header className={styles.tripHeader}>
                        <Link to="/" className={styles.headerButton}>
                            <ChevronLeft width={20} height={20} />
                        </Link>
                        <h3 className={styles.tripTitle}>
                            {trip?.name ?? ""}
                        </h3>
                        <TripPlayButton stops={animationControls.stops} />
                        <TripStopButton />
                        <button 
                            title="Day View" 
                            onClick={onToggleDayView}
                            className={clsx(
                                dayView && styles.dayView,
                            )}
                        >
                            <CalendarDate width={20} height={20} />
                        </button>
                        <div 
                            role="button" 
                            className={styles.headerButton}
                            onClick={onToggleTripMenu}
                        >
                            <ThreeDots width={20} height={20} />
                            <div 
                                className={clsx(
                                    styles.menu,
                                    isTripMenuOpened && styles.opened
                                )}
                                onClick={onCloseTripMenu}
                            >
                                <button 
                                    onClick={onEditClick}
                                    className={styles.menuButton}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={onDeleteClick} 
                                    className={styles.menuButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </header>
                    <p>
                        {trip?.totalDistance 
                        ? `Distance is: ${trip.totalDistance}km`
                        : "Distance is unavailable."} 
                    </p>
                    <button
                        onClick={onOpenStopForm}
                        className={styles.button}
                    >
                        Add New Stop
                    </button>
                    <DndWrapper
                        items={displayStops}
                        setItems={onSetStopsOrder}
                    >
                        <div className={styles.stopList}>
                            {displayStops.map((stop, index) => 
                                <StopItem
                                    key={stop.id}
                                    stop={stop}
                                    tripId={trip?.id ?? ""}
                                    day={dayView ? trip?.days[index] : undefined} // Передаємо день тільки якщо dayView
                                />
                            )}
                        </div>
                    </DndWrapper>
                    <div
                        style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}
                    >
                        <button 
                            onClick={animationControls.onToggleAutocontinue}
                            style={{background: "#00a", padding: "10px", color: "#fff", borderRadius: "5px"}}
                        >
                            Autoplay Trip? {animationControls.autocontinue ? "Yes" : "No"}
                        </button>
                        <button 
                            onClick={animationControls.onToggleCameraMounted}
                            style={{background: "#00a", padding: "10px", color: "#fff", borderRadius: "5px"}}
                        >
                            Mount camera? {animationControls.isCameraMounted ? "Yes" : "No"}
                        </button>
                    </div>
                </>
            ) : (
                <StopForm 
                    tripId={trip?.id ?? ""} 
                    onClose={onCloseStopForm}  
                />
            )}
        </div>        
    )
}

export default TripPage;