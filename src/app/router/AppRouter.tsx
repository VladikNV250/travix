import { FC } from "react";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router";
import { Layout } from "app/layouts";
import { HomePage } from "pages/home";
import { TripPage } from "pages/trip";
import { StopPage } from "pages/stop";
import { withSuspense } from "shared/lib";
import { EditTripPage } from "pages/edit-trip";
import clsx from "clsx";

export const AppRouter: FC = () => {
    return (
        <div className={clsx("app")}>
            <BrowserRouter>
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
            </BrowserRouter>
        </div>
    )
}