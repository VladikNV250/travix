import { FC } from 'react';
import { Link } from 'react-router';

import clsx from 'clsx';

import { StopForm, StopItem } from 'features/stops';
import { TripPlayButton, TripStopButton } from 'features/trip-animation';
import {
	CalendarDateIcon,
	ChevronLeftIcon,
	ThreeDotsIcon,
} from 'shared/assets';
import { DndWrapper } from 'shared/lib';

import { useTripPage } from '../model';
import styles from './style.module.scss';

const TripPage: FC = () => {
	const { tripData, tripMenu, stopDisplay, stopForm, animation } =
		useTripPage();

	return (
		<div className={styles.trip}>
			{!stopForm.isOpen ? (
				<>
					<header className={styles.tripHeader}>
						<Link
							to="/"
							className={styles.headerButton}
						>
							<ChevronLeftIcon
								width={20}
								height={20}
							/>
						</Link>
						<h3 className={styles.tripTitle}>{tripData?.name ?? ''}</h3>
						<TripPlayButton stops={animation.stops} />
						<TripStopButton />
						<button
							title="Day View"
							onClick={stopDisplay.toggleDayView}
							className={clsx(stopDisplay.dayView && styles.dayView)}
						>
							<CalendarDateIcon
								width={20}
								height={20}
							/>
						</button>
						<div
							role="button"
							tabIndex={0}
							className={styles.headerButton}
							onClick={tripMenu.toggle}
							onKeyDown={tripMenu.toggle}
						>
							<ThreeDotsIcon
								width={20}
								height={20}
							/>
							<div
								role="menu"
								tabIndex={0}
								className={clsx(styles.menu, tripMenu.isOpen && styles.opened)}
								onClick={tripMenu.close}
								onKeyDown={tripMenu.close}
							>
								<button
									onClick={tripMenu.edit}
									className={styles.menuButton}
								>
									Edit
								</button>
								<button
									onClick={tripMenu.delete}
									className={styles.menuButton}
								>
									Delete
								</button>
							</div>
						</div>
					</header>
					<p>
						{tripData?.totalDistance
							? `Distance is: ${tripData.totalDistance}km`
							: 'Distance is unavailable.'}
					</p>
					<button
						onClick={stopForm.open}
						className={styles.button}
					>
						Add New Stop
					</button>
					<DndWrapper
						items={stopDisplay.stops}
						setItems={stopDisplay.setStopsOrder}
					>
						<div className={styles.stopList}>
							{stopDisplay.stops.map((stop, index) => (
								<StopItem
									key={stop.id}
									stop={stop}
									tripId={tripData?.id ?? ''}
									day={stopDisplay.dayView ? tripData?.days[index] : undefined} // Передаємо день тільки якщо dayView
								/>
							))}
						</div>
					</DndWrapper>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '10px',
						}}
					>
						<button
							onClick={animation.toggleAutocontinue}
							style={{
								background: '#00a',
								padding: '10px',
								color: '#fff',
								borderRadius: '5px',
							}}
						>
							Autoplay Trip? {animation.autocontinue ? 'Yes' : 'No'}
						</button>
						<button
							onClick={animation.toggleCameraMounted}
							style={{
								background: '#00a',
								padding: '10px',
								color: '#fff',
								borderRadius: '5px',
							}}
						>
							Mount camera? {animation.isCameraMounted ? 'Yes' : 'No'}
						</button>
					</div>
				</>
			) : (
				<StopForm
					tripId={tripData?.id ?? ''}
					onClose={stopForm.close}
				/>
			)}
		</div>
	);
};

export default TripPage;
