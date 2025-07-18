import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Link, useParams } from 'react-router';

import clsx from 'clsx';

import { useEditTripForm } from '../model';

const EditTripPage = () => {
	const { tripId } = useParams<{ tripId: string }>();
	const [pickerIsOpen, setPickerIsOpen] = useState(false);
	const { formData, isSubmitting, onSubmit, onColorChange } =
		useEditTripForm(tripId);

	return (
		<form onSubmit={onSubmit}>
			<div className="flex items-end justify-between gap-6">
				<div>
					<label htmlFor="tripName">Trip Name</label>
					<input
						id="tripName"
						name="name"
						className="w-full resize-none rounded bg-zinc-200 px-2 py-1.5 text-lg"
						defaultValue={formData.name}
					/>
				</div>
				<button
					onClick={() => setPickerIsOpen(p => !p)}
					className="relative size-8 rounded-full"
					style={{ background: formData.color }}
					type="button"
				>
					<div
						role="button"
						tabIndex={0}
						className={clsx(
							'absolute top-0 left-[calc(100%+1rem)]',
							pickerIsOpen ? 'block' : 'hidden',
						)}
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
			<div className="mt-3 flex items-center justify-between gap-4">
				<button
					className="w-full rounded-lg bg-green-800 p-2 text-white"
					type="submit"
					disabled={isSubmitting}
				>
					Save
				</button>
				<Link
					to={`/trip/${tripId}`}
					className="w-full rounded-lg bg-gray-600 p-2 text-white"
				>
					Back
				</Link>
			</div>
		</form>
	);
};

export default EditTripPage;
