import { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { DivIcon, Icon, IconOptions } from 'leaflet';

import { Stop } from 'entities/stop';
import { useStopMarker } from 'features/stops/model';
import { formatDate } from 'shared/lib';
import { SimpleLoader } from 'shared/ui';

import styles from './style.module.scss';

interface IStopMarker {
	stop: Stop;
	icon?: Icon<IconOptions> | DivIcon;
}

export const StopMarker: FC<IStopMarker> = ({ stop, icon }) => {
	const { weather, holiday, isLoading, updateStopInfo } = useStopMarker();

	return (
		<Marker
			position={stop.location}
			icon={icon}
			eventHandlers={{
				click: async () => await updateStopInfo(stop),
			}}
		>
			<Popup>
				<div className={styles.popupContent}>
					{holiday && (
						<div className={styles.balloonWrapper}>
							<div className={styles.balloon} />
							<div className={styles.balloon} />
							<div className={styles.balloon} />
						</div>
					)}
					<h4 className={styles.address}>{stop.address}</h4>
					{isLoading ? (
						<SimpleLoader loading={isLoading} />
					) : (
						<>
							<div className={styles.horizontalLine} />
							<h4 className={styles.popupTitle}>Weather</h4>
							<p className={styles.popupSubtitle}>
								{`On ${formatDate(new Date(stop.arrivalDate || Date.now()))}`}
							</p>
							{weather ? (
								<div className={styles.weatherContainer}>
									<div className={styles.temperatureContainer}>
										<img
											src={weather.icon}
											alt={weather.condition}
											className={styles.conditionIcon}
										/>
										<p className={styles.temperature}>
											{Math.floor(weather.temperature)}
											&#8451;
										</p>
									</div>
									<p className={styles.condition}>{weather.condition}</p>
								</div>
							) : (
								<p className={styles.condition}>
									Weather is temporarily unavailable
								</p>
							)}
							<div className={styles.horizontalLine} />
							<h4 className={styles.popupTitle}>Holidays</h4>
							{holiday ? (
								<p className={styles.popupSubtitle}>{holiday.name}</p>
							) : (
								<p className={styles.popupSubtitle}>
									There are no holidays on this date
								</p>
							)}
						</>
					)}
				</div>
			</Popup>
		</Marker>
	);
};
