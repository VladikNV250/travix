import { FC } from "react";
import { 
    BrowserRouter, 
    Outlet, 
    Route, 
    Routes 
} from "react-router";
import { HomePage } from "pages/home";
import clsx from "clsx";

export const AppRouter: FC = () => {
    return (
        <div className={clsx("app")}>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/"
                        element={<Outlet />}
                    >
                        <Route index element={<HomePage />} />
                    </Route>    
                </Routes>   
            </BrowserRouter>
        </div>
    )
}