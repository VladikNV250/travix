import { FC } from 'react';

import { TripList } from 'entities/trip';
import { Header } from 'widgets/header';
import { MapWidget } from 'widgets/map-widget';

export const Layout: FC = () => {
	return (
		<main className="grid h-screen w-screen grid-cols-[auto_1fr]">
			<div className="flex w-80 flex-col border-r border-gray-200 bg-white shadow-xl">
				<Header />
				<TripList />
			</div>
			<MapWidget />
		</main>
	);
};
