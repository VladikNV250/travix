import { FC } from "react";
import { 
    BrowserRouter, 
    Route, 
    Routes 
} from "react-router";
import { Layout } from "app/layouts";
import { HomePage } from "pages/home";
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
                        <Route index element={<HomePage />} />
                    </Route>    
                </Routes>   
            </BrowserRouter>
        </div>
    )
}