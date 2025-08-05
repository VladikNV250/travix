import { useParams } from 'react-router';

import clsx from 'clsx';

import { calculateDistance, selectTrip } from 'entities/trip';
import { OpenShareButton } from 'features/share-trip';
import { DeleteTripButton, EditTripButton } from 'features/trip-control';
import { useAppSelector } from 'shared/lib';

import { useVisibleTrip } from '../model';

export const TripHeader = () => {
	const { tripId } = useParams();
	const trip = useAppSelector(selectTrip(tripId ?? ''));

	const { visibleTrip, handleAnimationEnd } = useVisibleTrip(trip ?? null);

	if (!visibleTrip) return null;

	return (
		<div
			className={clsx(
				'animate-slide-fade-in absolute top-0 left-0 z-100 w-full border-b border-gray-200 bg-white p-6',
				trip ? 'animate-slide-fade-in' : 'animate-slide-fade-out',
			)}
			onAnimationEnd={handleAnimationEnd}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div
						className={`size-3 rounded-full`}
						style={{ backgroundColor: visibleTrip.color }}
					/>
					<h2 className="text-2xl font-bold text-gray-900">
						{visibleTrip.name ?? ''}
					</h2>
					{visibleTrip.stops.length > 1 && (
						<span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
							Distance: {calculateDistance(visibleTrip.stops)}
						</span>
					)}
				</div>
				<div className="flex items-center gap-3">
					<EditTripButton />
					<DeleteTripButton />
					<OpenShareButton />
				</div>
			</div>
		</div>
	);
};
