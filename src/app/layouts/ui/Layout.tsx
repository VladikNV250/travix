import { FC } from 'react';
import { Outlet } from 'react-router';

import { AnimatePresence } from 'framer-motion';

import { TripList } from 'entities/trip';
import { Header } from 'widgets/header';
import { MapWidget } from 'widgets/map-widget';
import { TripHeader } from 'widgets/trip-header';

export const Layout: FC = () => {
	return (
		<main className="grid h-screen w-screen grid-cols-[auto_1fr]">
			<div className="z-20 flex w-80 flex-col border-r border-gray-200 bg-white shadow-xl">
				<Header />
				<TripList />
			</div>
			<div className="relative z-10">
				<TripHeader />
				<div className="absolute top-0 left-0 z-90 h-full w-80">
					<AnimatePresence>
						<Outlet />
					</AnimatePresence>
				</div>
				<MapWidget />
			</div>
		</main>
	);
};
