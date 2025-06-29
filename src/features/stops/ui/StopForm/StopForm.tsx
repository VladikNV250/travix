import { FC } from "react";
import { ImageUpload } from "features/image";
import { Trip } from "entities/trip";
import { Stop } from "entities/stop";
import { useStopFormViewModel } from "features/stops/model";
import { StopGallery } from "../StopGallery/StopGallery";
import clsx from "clsx";
import styles from "./style.module.scss";

interface IStopForm {
    tripId: Trip["id"];
    initialData?: Stop;
    onClose?: () => void;
}

export const StopForm: FC<IStopForm> = ({ tripId, initialData, onClose }) => {
    const {
        formData,
        predictions,
        onDataChange,
        onPredictionSelect,
        onSaveStop,
        onAddImage,
        onDeleteImage,
        editMode,
        hasUnsavedChanges,
        isFormValid,
        isSubmitting,
        onCancel,
        submitError,
    } = useStopFormViewModel({
        tripId,
        initialData,
        onClose
    })

    return (
        <form 
            className={styles.form}
            onSubmit={async (e) => await onSaveStop(e)}
        >
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className={styles.input}
                    value={formData.address}
                    onChange={onDataChange}
                />
                <div className={styles.predictions}>
                    {predictions.map(prediction => 
                        <p 
                            key={prediction.place_id} 
                            className={styles.prediction}
                            onClick={() => onPredictionSelect(prediction.description)}
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
                onChange={onDataChange}
            />
            <input 
                type="date"
                name="departureDate"
                value={formData.departureDate}
                className={styles.input}
                onChange={onDataChange}
            />      
            <textarea 
                name="notes"
                value={formData.notes}
                className={styles.input}
                onChange={onDataChange}
                placeholder="Enter your notes"
                rows={4}
            />    
            <ImageUpload onUpload={onAddImage} />
            {submitError && (<p className={styles.errorMessage}>{submitError}</p>)}
            <button 
                type="submit" 
                className={styles.button}
                disabled={!isFormValid || isSubmitting}
            >
                {editMode ?  
                (hasUnsavedChanges ? "Save Changes" : "Save Changes (nothing unchanged)") : 
                "Add Stop +"}
            </button>
            <button 
                type="button"
                className={clsx(styles.button, styles.grey)}
                onClick={onCancel}
            >
                Back
            </button>
            <StopGallery 
                images={formData.images} 
                onDelete={onDeleteImage}
            />
        </form>
    )
}