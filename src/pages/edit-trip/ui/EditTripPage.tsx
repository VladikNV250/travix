import { editTrip, selectTrips } from "features/trip";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "shared/lib";
import styles from "./style.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import clsx from "clsx";
import { Trip, validateTrip } from "entities/trip";
import { HexColorPicker } from "react-colorful";

const EditTripPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { tripId } = useParams();
    const trips = useAppSelector(selectTrips);
    const trip = trips.find(trip => trip.id === tripId); 
    const [tripData, setTripData] = useState({
        name: trip?.name ?? "",
        color: trip?.color ?? "",
    })
    const [pickerIsOpen, setPickerIsOpen] = useState(false);

    useEffect(() => {
        setTripData({
            name: trip?.name ?? "New Trip",
            color: trip?.color ?? "#ff0000",
        })
    }, [trip])

    const handleEdit = () => {
        if (!trip) return;

        const updatedTrip: Trip = {
            ...trip,
            name: tripData.name,
            color: tripData.color,
        }

        if (validateTrip(updatedTrip)) {
            dispatch(editTrip(updatedTrip));
            navigate(`/trip/${tripId}`);
        }
    }

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setTripData(prevState => ({
            ...prevState,
            name: value,
        }));
    }

    const changeColor = (newColor: string) => {
        setTripData(prevState => ({
            ...prevState,
            color: newColor,
        }))
    }

    return (
        <form className={styles.trip}>
            <div className={styles.formContainer}>
                <div>
                    <label htmlFor="tripName">Trip Name</label>
                    <input 
                        name="name"
                        className={styles.input}
                        value={tripData.name}
                        onChange={changeName}
                    />
                </div>
                <button 
                    onClick={() => setPickerIsOpen(!pickerIsOpen)}
                    className={styles.colorButton} 
                    style={{background: tripData.color}}
                    type="button"
                >
                    <div 
                        className={clsx(
                            styles.colorPicker, 
                            pickerIsOpen && styles.opened
                        )}
                        onClick={e => e.stopPropagation()}
                    >
                        <HexColorPicker 
                            color={tripData.color}
                            onChange={changeColor}
                        />
                    </div>
                </button>
            </div>
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