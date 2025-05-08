import { editTrip, selectTrips } from "features/trip";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "shared/lib";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Trip, validateTrip } from "entities/trip";

const EditTripPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { tripId } = useParams();
    const trips = useAppSelector(selectTrips);
    const trip = trips.find(trip => trip.id === tripId); 
    const [tripName, setTripName] = useState(trip?.name ?? "");

    useEffect(() => {
        setTripName(trip?.name ?? "");
    }, [trip])

    const handleEdit = () => {
        if (!trip) return;

        const updatedTrip: Trip = {
            ...trip,
            name: tripName,
        }

        if (validateTrip(updatedTrip)) {
            dispatch(editTrip(updatedTrip));
            navigate(`/trip/${tripId}`);
        }
    }

    return (
        <form className={styles.trip}>
            <label htmlFor="tripName">Trip Name</label>
            <input 
                name="tripName"
                className={styles.input}
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
            />
            <div className={styles.buttonContainer}>
                <button 
                    className={styles.button}
                    onClick={handleEdit}
                >
                    Save
                </button>
                <button 
                    onClick={() => navigate(`/trip/${tripId}`)}
                    className={clsx(styles.button, styles.grey)}
                >
                    Back
                </button>
            </div>
        </form>
    )
}

export default EditTripPage;