import { 
    FC, 
    ReactNode 
} from "react";
import { Provider } from "react-redux";
import { store } from "app/store";
import { MapProvider } from "features/map";
import { DropdownProvider } from "shared/lib";

interface IProviders {
    children: ReactNode;
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <Provider store={store}>
            <MapProvider>
                <DropdownProvider>
                    {children}
                </DropdownProvider>
            </MapProvider>
        </Provider>
    )
}