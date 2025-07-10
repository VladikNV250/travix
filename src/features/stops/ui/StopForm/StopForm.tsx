import { FC } from 'react';

import clsx from 'clsx';

import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';
import { ImageUpload } from 'features/image';
import { useStopForm } from 'features/stops/model/stop-form/useStopForm';

import { StopGallery } from '../StopGallery/StopGallery';
import styles from './style.module.scss';

interface StopFormProps {
	tripId: Trip['id'];
	initialData?: Partial<Stop>;
	onClose?: () => void;
}

export const StopForm: FC<StopFormProps> = ({
	tripId,
	initialData = {},
	onClose,
}) => {
	const {
		formData,
		predictions,
		submitError,

		onDataChange,
		onPredictionSelect,
		onSaveStop,
		onAddImage,
		onDeleteImage,
		onCancel,

		hasUnsavedChanges,
		isEditMode,
		isFormValid,
		isSubmitting,
	} = useStopForm(tripId, initialData, onClose);

	return (
		<form
			className={styles.form}
			onSubmit={async e => await onSaveStop(e)}
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
					{predictions.map(prediction => (
						<button
							key={prediction.id}
							className={styles.prediction}
							onClick={() => onPredictionSelect(prediction.text)}
						>
							{prediction.text}
						</button>
					))}
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
			{submitError && <p className={styles.errorMessage}>{submitError}</p>}
			<button
				type="submit"
				className={styles.button}
				disabled={!isFormValid || isSubmitting}
			>
				{isEditMode
					? hasUnsavedChanges
						? 'Save Changes'
						: 'Save Changes (nothing unchanged)'
					: 'Add Stop +'}
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
	);
};
