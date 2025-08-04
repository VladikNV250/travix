import { FC } from 'react';
import { Outlet } from 'react-router';

import { TripList } from 'entities/trip';
import { Header } from 'widgets/header';
import { MapWidget } from 'widgets/map-widget';
import { TripHeader } from 'widgets/trip-header';

export const Layout: FC = () => {
	return (
		<main className="grid h-screen w-screen grid-cols-[auto_1fr]">
			<div className="flex w-80 flex-col border-r border-gray-200 bg-white shadow-xl">
				<Header />
				<TripList />
			</div>
			<div className="relative">
				<TripHeader />
				<div className="absolute top-0 left-0 z-100 h-full w-80">
					<Outlet />
				</div>
				<MapWidget />
			</div>
		</main>
	);
};
