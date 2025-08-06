import { FC } from 'react';
import { Route, Routes } from 'react-router';

import { Layout } from 'app/layouts';
import { EditTripPage } from 'pages/edit-trip';
import { HomePage } from 'pages/home';
import { StopPage } from 'pages/stop';
import { TripPage } from 'pages/trip';
import { withSuspense } from 'shared/lib';

export const AppRouter: FC = () => {
	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={<Layout />}
				>
					<Route
						index
						element={withSuspense(<HomePage />)}
					/>
					<Route
						path="trip/:tripId"
						element={withSuspense(<TripPage />)}
					/>
					<Route
						path="trip/:tripId/edit"
						element={withSuspense(<EditTripPage />)}
					/>
					<Route
						path="trip/:tripId/stop/:stopId"
						element={withSuspense(<StopPage />)}
					/>
				</Route>
			</Routes>
		</div>
	);
};
