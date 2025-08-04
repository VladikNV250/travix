import { FC } from 'react';
import { Link, useParams } from 'react-router';

import clsx from 'clsx';
import { MapPin, MoreHorizontal, Route } from 'lucide-react';

import { calculateDistance } from '../lib';
import { Trip } from '../model/types';

interface TripItemProps {
	readonly trip: Trip;
}

export const TripItem: FC<TripItemProps> = ({ trip }) => {
	const { tripId: selectedTripId } = useParams();

	return (
		<div
			className={clsx(
				'group flex w-full flex-col rounded-xl border-2 p-4 text-left',
				selectedTripId === trip.id
					? 'border-blue-200 bg-blue-50 shadow-md'
					: 'border-transparent bg-gray-50 hover:border-gray-200 hover:bg-gray-100 hover:shadow-md',
			)}
		>
			<div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
				<div
					className="size-4 rounded-full"
					style={{ backgroundColor: trip.color }}
				/>
				<Link
					className="line-clamp-1 font-medium text-gray-700 group-hover:text-gray-900"
					to={`/trip/${trip.id}`}
				>
					{trip.name}
				</Link>
				<button className="text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
					<MoreHorizontal className="size-5" />
				</button>
			</div>
			<div className="flex max-h-0 gap-x-4 overflow-hidden text-xs text-gray-500 opacity-0 transition-all duration-200 group-hover:mt-3 group-hover:max-h-20 group-hover:opacity-100">
				{trip.stops.length > 1 ? (
					<>
						<span className="flex items-center gap-1">
							<MapPin className="size-3" />
							{trip.stops.length} stops
						</span>
						<span className="flex items-center gap-1">
							<Route className="size-3" />
							{calculateDistance(trip.stops)}
						</span>
					</>
				) : (
					<span className="text-gray-400 italic">
						Empty trip - click to add stops
					</span>
				)}
			</div>
		</div>
	);
};
