import { FC } from 'react';

import { ImageUpload } from 'entities/image';
import { Stop } from 'entities/stop';
import { Trip } from 'entities/trip';
import { useStopForm } from 'features/stops/model/stop-form/useStopForm';

import { StopGallery } from './StopGallery';

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
			className="flex flex-col gap-1.5"
			onSubmit={async e => await onSaveStop(e)}
		>
			<div className="relative">
				<input
					type="text"
					name="address"
					placeholder="Enter address"
					className="peer w-full resize-none rounded bg-neutral-200 px-2 py-1.5 text-sm focus:rounded-b-none"
					value={formData.address}
					onChange={onDataChange}
				/>
				<div className="invisible absolute top-full left-0 z-2 flex w-full flex-col gap-0.5 overflow-hidden rounded-b-md bg-neutral-300 peer-focus:visible">
					{predictions.map(prediction => (
						<button
							key={prediction.id}
							className="line-clamp-1 cursor-pointer px-2.5 py-1.5 text-ellipsis hover:bg-neutral-400"
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
				className="w-full resize-none rounded bg-neutral-200 px-2 py-1.5 text-sm focus:rounded-br-none focus:rounded-bl-none"
				onChange={onDataChange}
			/>
			<input
				type="date"
				name="departureDate"
				value={formData.departureDate}
				className="w-full resize-none rounded bg-neutral-200 px-2 py-1.5 text-sm focus:rounded-br-none focus:rounded-bl-none"
				onChange={onDataChange}
			/>
			<textarea
				name="notes"
				value={formData.notes}
				className="w-full resize-none rounded bg-neutral-200 px-2 py-1.5 text-sm focus:rounded-br-none focus:rounded-bl-none"
				onChange={onDataChange}
				placeholder="Enter your notes"
				rows={4}
			/>
			<ImageUpload onUpload={onAddImage} />
			{submitError && (
				<p className="rounded border border-rose-400 bg-rose-300 p-4">
					{submitError}
				</p>
			)}
			<button
				type="submit"
				className="mt-1.5 rounded-lg bg-green-700 p-2 text-white"
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
				className="mt-1.5 rounded-lg bg-gray-700 p-2 text-white"
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
