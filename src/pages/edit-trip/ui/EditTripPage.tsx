import { HexColorPicker } from "react-colorful";
import { useEditTripViewModel } from "../model";
import clsx from "clsx";
import styles from "./style.module.scss";

const EditTripPage = () => {
    const {
        tripId,
        formData,
        isColorPickerOpen,
        onNameChange,
        onColorChange,
        onToggleColorPicker,
        onSaveTrip,
        onGoBack,
        isFormValid,
        tripExists
    } = useEditTripViewModel(); 

    if (!tripExists) {
        return (
            <div className={styles.errorMessage}>
                Trip with ID "{tripId}" not found.
            </div>
        )
    }

    return (
        <form 
            className={styles.trip}
            onSubmit={(e) => { e.preventDefault(); onSaveTrip(); }}
        >
            <div className={styles.formContainer}>
                <div>
                    <label htmlFor="tripName">Trip Name</label>
                    <input 
                        id="tripName"
                        name="name"
                        className={styles.input}
                        value={formData.name}
                        onChange={onNameChange}
                    />
                </div>
                <button 
                    onClick={onToggleColorPicker}
                    className={styles.colorButton} 
                    style={{background: formData.color}}
                    type="button"
                >
                    <div 
                        className={clsx(
                            styles.colorPicker, 
                            isColorPickerOpen && styles.opened
                        )}
                        onClick={e => e.stopPropagation()}
                    >
                        <HexColorPicker 
                            color={formData.color}
                            onChange={onColorChange}
                        />
                    </div>
                </button>
            </div>
            <div className={styles.buttonContainer}>
                <button 
                    className={styles.button}
                    type="submit"
                    disabled={!isFormValid}
                >
                    Save
                </button>
                <button 
                    onClick={onGoBack}
                    className={clsx(styles.button, styles.grey)}
                    type="button"
                >
                    Back
                </button>
            </div>
        </form>
    )
}

export default EditTripPage;