import { ChangeEvent, useState } from 'react';
import { Link, useParams } from 'react-router';

import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';

import { selectTrip } from 'entities/trip';
import { ColorPicker } from 'features/color-picker';
import { ANIMATION_VARIANTS } from 'shared/config';
import { useAppSelector } from 'shared/lib';
import { Button, Input } from 'shared/ui';

import { TRIP_COLORS } from '../config';

const TripFormPage = () => {
	const { tripId } = useParams();
	const trip = useAppSelector(selectTrip(tripId));
	const [tripFormData, setTripFormData] = useState({
		name: trip?.name || '',
	});
	const [color, setColor] = useState(trip?.color || TRIP_COLORS[0]);

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setTripFormData(p => ({
			...p,
			name: e.target.value,
		}));
	};

	return (
		<motion.form
			onSubmit={e => e.preventDefault()}
			className="flex h-full flex-col border-r border-gray-200 bg-white shadow-xl"
			variants={ANIMATION_VARIANTS}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.4 }}
		>
			<div className="p-6">
				<h2 className="mb-4 text-lg font-semibold text-gray-900">
					Create New Trip
				</h2>
				<Input
					type="text"
					label="Trip Name"
					value={tripFormData.name}
					placeholder="Enter trip name"
					onChange={onChangeName}
					className="mb-6"
				/>
				<ColorPicker
					colors={TRIP_COLORS}
					onChange={setColor}
					selectedColor={color}
					className="mb-6"
				/>
			</div>
			<div className="flex gap-3 border-t border-gray-200 p-6">
				<Button
					type="button"
					className="w-1/2 justify-center"
					asChild
				>
					<Link to="/">
						<ArrowLeft className="size-4" />
						Back
					</Link>
				</Button>
				<Button
					type="submit"
					variant="primary"
					size="md"
					className="w-1/2 justify-center bg-green-500 hover:bg-green-600"
				>
					<Save className="size-4" />
					Save
				</Button>
			</div>
		</motion.form>
	);
};

export default TripFormPage;
