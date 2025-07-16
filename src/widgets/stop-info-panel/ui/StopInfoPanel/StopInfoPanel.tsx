import { FC } from 'react';

import clsx from 'clsx';

import { useHoliday } from 'entities/holiday';
import { StopSliderGallery } from 'entities/stop';
import { useWeather } from 'entities/weather';
import { selectCurrentStop } from 'features/routing';
import { TripContinueButton } from 'features/trip-animation';
import { formatDate, useAppSelector } from 'shared/lib';
import { SimpleLoader } from 'shared/ui';
import { extractCityAndRegion } from 'widgets/stop-info-panel/lib';

export const StopInfoPanel: FC = () => {
	const currentStop = useAppSelector(selectCurrentStop);
	const { weather, loading: weatherLoading } = useWeather(currentStop);
	const { holiday, loading: holidayLoading } = useHoliday(currentStop);

	const hasStop = Boolean(currentStop);
	const [city, region] = extractCityAndRegion(currentStop?.address ?? null);
	const displayDate = formatDate(
		new Date(currentStop?.arrivalDate || Date.now()),
	);

	return (
		<div
			className={clsx(
				'animate-slide-fade-out absolute top-0 left-0 z-10 w-full bg-linear-to-l from-sky-300 to-blue-900 opacity-0',
				hasStop && 'animate-slide-fade-in',
			)}
		>
			{hasStop && (
				<>
					<header className="mb-3 flex items-center justify-between">
						<div className="flex flex-col text-neutral-50">
							<h3 className="text-2xl font-medium">{city}</h3>
							<h4>{region}</h4>
						</div>
						<TripContinueButton />
					</header>
					<div className="grid grid-flow-col grid-cols-3 gap-4">
						<div className="max-h-27.5 min-h-15 w-full overflow-y-hidden rounded-xl bg-white/40 p-3">
							<header className="flex items-center justify-between">
								<h4 className="text-xl font-medium text-neutral-50">Weather</h4>
								<h4 className="text-base text-neutral-50 italic">
									On {displayDate}
								</h4>
							</header>
							{weatherLoading ? (
								<SimpleLoader loading={true} />
							) : weather ? (
								<div className="flex items-center justify-between">
									<div>
										<p className="text-lg font-medium text-neutral-50">
											{weather.temperature}&#8451;
										</p>
										<p className="text-sm text-neutral-100">
											{weather.condition}
										</p>
									</div>
									<img
										src={weather.icon}
										alt={weather.condition}
										className="size-12"
									/>
								</div>
							) : (
								<p className="text-sm text-neutral-100">
									Weather is temporarily unavailable
								</p>
							)}
						</div>
						<div className="max-h-27.5 min-h-15 w-full overflow-y-hidden rounded-xl bg-white/40 p-3">
							<h4 className="text-xl font-medium text-neutral-50">Holidays</h4>
							{holidayLoading ? (
								<SimpleLoader />
							) : holiday ? (
								<p className="text-base text-neutral-50 italic">
									{holiday.name}
								</p>
							) : (
								<p className="text-base text-neutral-50 italic">
									There are no holidays on this date
								</p>
							)}
						</div>
						<div className="max-h-27.5 min-h-15 w-full overflow-y-hidden rounded-xl bg-white/40 p-3">
							<h4 className="text-xl font-medium text-neutral-50">Notes</h4>
							<p className="no-scrollbar h-full overflow-y-hidden text-sm text-neutral-50">
								{currentStop?.notes || 'No notes about this place.'}
							</p>
						</div>
					</div>
					<StopSliderGallery gallery={currentStop?.images || []} />
				</>
			)}
		</div>
	);
};
