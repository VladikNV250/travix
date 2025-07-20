import { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import { selectTrips } from 'entities/trip';
import { useAppSelector } from 'shared/lib';
import { StopForm } from 'widgets/stop-form';

const StopPage: FC = () => {
	const navigate = useNavigate();
	const { tripId, stopId } = useParams();
	const trips = useAppSelector(selectTrips);
	const trip = trips.find(trip => trip.id === tripId);
	const stop = useMemo(
		() => trip?.stops.find(stop => stop.id === stopId),
		[trip, stopId],
	);

	return (
		<div>
			<StopForm
				tripId={tripId ?? ''}
				initialData={stop}
				onClose={() => navigate(`/trip/${tripId}`)}
			/>
		</div>
	);
};

export default StopPage;
