import { FC } from 'react';
import { Link } from 'react-router';

import clsx from 'clsx';

import { SharePopup, useSharePopup } from 'features/share-trip';
import { StopForm, StopItem } from 'features/stops';
import { TripPlayButton, TripStopButton } from 'features/trip-animation';
import {
	CalendarDateIcon,
	ChevronLeftIcon,
	ThreeDotsIcon,
} from 'shared/assets';
import { DndWrapper } from 'shared/lib';

import { useTripPage } from '../model';

const TripPage: FC = () => {
	const { trip, tripData, tripMenu, stopDisplay, stopForm, animation } =
		useTripPage();

	const popup = useSharePopup();

	return (
		<div>
			<SharePopup
				trip={trip}
				isOpen={popup.isOpen}
				closePopup={popup.close}
			/>
			{!stopForm.isOpen ? (
				<>
					<header className="grid-[auto_1fr] grid grid-flow-col items-center gap-4">
						<Link
							to="/"
							className="relative flex cursor-pointer items-center justify-center"
						>
							<ChevronLeftIcon
								width={20}
								height={20}
							/>
						</Link>
						<h3 className="line-clamp-1 max-w-60 min-w-40 text-2xl text-ellipsis">
							{tripData?.name ?? ''}
						</h3>
						<TripPlayButton stops={animation.stops} />
						<TripStopButton />
						<button
							title="Day View"
							onClick={stopDisplay.toggleDayView}
							className={clsx(stopDisplay.dayView && 'text-sky-600')}
						>
							<CalendarDateIcon
								width={20}
								height={20}
							/>
						</button>
						<button
							className="relative flex cursor-pointer items-center justify-center"
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
								className={clsx(
									'absolute top-0 left-[calc(100%+0.625rem)] w-max flex-col bg-zinc-200',
									tripMenu.isOpen ? 'flex' : 'hidden',
								)}
								onClick={tripMenu.close}
								onKeyDown={tripMenu.close}
							>
								<button
									onClick={tripMenu.edit}
									className="flex w-full p-2 text-start text-sm text-black hover:bg-zinc-300"
								>
									Edit
								</button>
								<button
									onClick={tripMenu.delete}
									className="flex w-full p-2 text-start text-sm text-black hover:bg-zinc-300"
								>
									Delete
								</button>
								<button
									onClick={popup.open}
									className="flex w-full p-2 text-start text-sm text-black hover:bg-zinc-300"
								>
									Share this trip
								</button>
							</div>
						</button>
					</header>
					<p>
						{tripData?.totalDistance
							? `Distance is: ${tripData.totalDistance}km`
							: 'Distance is unavailable.'}
					</p>
					<button
						onClick={stopForm.open}
						className="mt-5 flex bg-green-800 px-4 py-2 text-white"
					>
						Add New Stop
					</button>
					<DndWrapper
						items={stopDisplay.stops}
						setItems={stopDisplay.setStopsOrder}
					>
						<div className="mt-6`">
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
					{/* TODO: REMOVE CODE BELOW \/ \/ \/ */}
					<div className="flex justify-between p-2.5">
						<button
							onClick={animation.toggleAutocontinue}
							className="rounded bg-blue-500 p-2.5 text-white"
						>
							Autoplay Trip? {animation.autocontinue ? 'Yes' : 'No'}
						</button>
						<button
							onClick={animation.toggleCameraMounted}
							className="rounded bg-blue-500 p-2.5 text-white"
						>
							Mount camera? {animation.isCameraMounted ? 'Yes' : 'No'}
						</button>
					</div>
					{/* /\ /\ /\ */}
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
