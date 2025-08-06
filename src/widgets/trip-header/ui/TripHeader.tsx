import { useLocation, useParams } from 'react-router';

import { AnimatePresence, motion } from 'framer-motion';

import { calculateDistance, selectTrip } from 'entities/trip';
import { OpenShareButton } from 'features/share-trip';
import { DeleteTripButton, EditTripButton } from 'features/trip-control';
import { useAppSelector } from 'shared/lib';

import { ANIMATION_VARIANTS } from '../config';

export const TripHeader = () => {
	const location = useLocation();
	const { tripId } = useParams();
	const trip = useAppSelector(selectTrip(tripId ?? ''));

	const isEdit = location.pathname.endsWith('/edit');

	return (
		<AnimatePresence>
			{trip && !isEdit && (
				<motion.div
					key={trip.id}
					className="absolute top-0 left-0 z-100 w-full border-b border-gray-200 bg-white p-6"
					variants={ANIMATION_VARIANTS}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.4 }}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div
								className={`size-3 rounded-full`}
								style={{ backgroundColor: trip.color }}
							/>
							<h2 className="text-2xl font-bold text-gray-900">
								{trip.name ?? ''}
							</h2>
							{trip.stops.length > 1 && (
								<span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
									Distance: {calculateDistance(trip.stops)}
								</span>
							)}
						</div>
						<div className="flex items-center gap-3">
							<EditTripButton tripId={tripId} />
							<DeleteTripButton />
							<OpenShareButton />
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
