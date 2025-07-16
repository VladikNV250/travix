import { FC } from 'react';
import { Outlet } from 'react-router';

import { Header } from 'widgets/header';
import { MapWidget } from 'widgets/map-widget';
import { StopInfoPanel } from 'widgets/stop-info-panel';

export const Layout: FC = () => {
	return (
		<main
			style={{
				gridTemplateAreas: `
					'header header'
					'sidebar map'
					'sidebar map'
				`,
			}}
			className="grid h-screen w-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
		>
			<Header />
			<nav
				style={{ gridArea: 'sidebar' }}
				className="relative z-10 h-full w-full p-8"
			>
				<Outlet />
			</nav>
			<div
				style={{ gridArea: 'map' }}
				className="relative z-0 h-full w-full"
			>
				<StopInfoPanel />
				<MapWidget />
			</div>
		</main>
	);
};
