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

import styles from './style.module.scss';

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
		<div className={clsx(styles.stopInfoPanel, hasStop && styles.active)}>
			{hasStop && (
				<>
					<header className={styles.header}>
						<div className={styles.titleContainer}>
							<h3 className={styles.title}>{city}</h3>
							<h4>{region}</h4>
						</div>
						<TripContinueButton />
					</header>
					<div className={styles.widgetContainer}>
						<div className={styles.infoWidget}>
							<header className={styles.infoHeader}>
								<h4 className={styles.infoTitle}>Weather</h4>
								<h4 className={styles.infoSubtitle}>On {displayDate}</h4>
							</header>
							{weatherLoading ? (
								<SimpleLoader loading={true} />
							) : weather ? (
								<div className={styles.weatherContainer}>
									<div className={styles.temperatureContainer}>
										<p className={styles.temperature}>
											{weather.temperature}&#8451;
										</p>
										<p className={styles.condition}>{weather.condition}</p>
									</div>
									<img
										src={weather.icon}
										alt={weather.condition}
										className={styles.conditionIcon}
									/>
								</div>
							) : (
								<p className={styles.condition}>
									Weather is temporarily unavailable
								</p>
							)}
						</div>
						<div className={styles.infoWidget}>
							<h4 className={styles.infoTitle}>Holidays</h4>
							{holidayLoading ? (
								<SimpleLoader />
							) : holiday ? (
								<p className={styles.infoSubtitle}>{holiday.name}</p>
							) : (
								<p className={styles.infoSubtitle}>
									There are no holidays on this date
								</p>
							)}
						</div>
						<div className={styles.infoWidget}>
							<h4 className={styles.infoTitle}>Notes</h4>
							<p className={styles.notes}>
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
