import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { createStop } from "../../model/createStop";
import { useAppDispatch } from "shared/lib";
import { useDebounce } from "use-debounce";
import { autocompletePlace, Prediction } from "features/geo";
import { useMap } from "features/map";
import clsx from "clsx";
import { addStop, editStop } from "features/trip";
import { Trip } from "entities/trip";
import { Stop, validateStop } from "entities/stop";

interface IStopForm {
    tripId: Trip["id"];
    initialData?: Stop;
    onClose?: () => void;
}

export const StopForm: FC<IStopForm> = ({ tripId, initialData, onClose }) => {
    const dispatch = useAppDispatch();
    const { map } = useMap();
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [formData, setFormData] = useState({
        address: initialData?.address || "",
        arrivalDate: initialData?.arrivalDate || "",
        departureDate: initialData?.departureDate || "",
        notes: initialData?.notes || "",
    })
    const [debouncedAddress] = useDebounce(formData.address, 400);

    const editMode = !!initialData;

    useEffect(() => {
        (async () => {
            if (debouncedAddress !== '') {
                const predictions = await autocompletePlace(debouncedAddress);
                setPredictions(predictions);
            } else {
                setPredictions([]);
            }
        })()
    }, [debouncedAddress])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (editMode) {
                const updatedStop: Stop = {
                    ...initialData,
                    ...formData,
                }

                if (validateStop(updatedStop)) {
                    dispatch(editStop({ tripId, updatedStop }));
                    onClose?.();
                }
            } else {
                const stop = await createStop(formData);

                if (stop) {
                    dispatch(addStop({tripId, stop}));
                    map?.flyTo(stop.location, 10, {animate: true})
    
                    setFormData({
                        address: "",
                        arrivalDate: "",
                        departureDate: "",
                        notes: "",
                    });
                    onClose?.();
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form className={styles.form}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className={styles.input}
                    value={formData.address}
                    onChange={handleChange}
                />
                <div className={styles.predictions}>
                    {predictions.map(prediction => 
                        <p 
                            key={prediction.place_id} 
                            className={styles.prediction}
                            onClick={() => setFormData(prevState => ({
                                ...prevState,
                                address: prediction.description
                            }))}
                        >
                            {prediction.description}
                        </p>
                    )}
                </div>
            </div>
            <input 
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                className={styles.input}
                onChange={handleChange}
            />
            <input 
                type="date"
                name="departureDate"
                value={formData.departureDate}
                className={styles.input}
                onChange={handleChange}
            />      
            <textarea 
                name="notes"
                value={formData.notes}
                className={styles.input}
                onChange={handleChange}
                placeholder="Enter your notes"
                rows={4}
            />    
            <button 
                type="submit" 
                onClick={async (e) => await handleSubmit(e)}
                className={styles.button}
            >
                {editMode ? "Save Changes" : "Add Stop +"}
            </button>
            <button 
                className={clsx(styles.button, styles.grey)}
                onClick={onClose}
            >
                Back
            </button>
        </form>
    )
}