import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Link, useParams } from 'react-router';

import clsx from 'clsx';

import { useEditTripForm } from '../model';
import styles from './style.module.scss';

const EditTripPage = () => {
	const { tripId } = useParams<{ tripId: string }>();
	const [pickerIsOpen, setPickerIsOpen] = useState(false);
	const { formData, isSubmitting, onSubmit, onColorChange } =
		useEditTripForm(tripId);

	return (
		<form
			className={styles.trip}
			onSubmit={onSubmit}
		>
			<div className={styles.formContainer}>
				<div>
					<label htmlFor="tripName">Trip Name</label>
					<input
						id="tripName"
						name="name"
						className={styles.input}
						defaultValue={formData.name}
					/>
				</div>
				<button
					onClick={() => setPickerIsOpen(p => !p)}
					className={styles.colorButton}
					style={{ background: formData.color }}
					type="button"
				>
					<div
						role="button"
						tabIndex={0}
						className={clsx(styles.colorPicker, pickerIsOpen && styles.opened)}
						onKeyDown={e => e.stopPropagation()}
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
					disabled={isSubmitting}
				>
					Save
				</button>
				<Link
					to={`/trip/${tripId}`}
					className={clsx(styles.button, styles.grey)}
				>
					Back
				</Link>
			</div>
		</form>
	);
};

export default EditTripPage;
