import { 
    FC, 
    ReactNode 
} from "react";
import { Provider } from "react-redux";
import { store } from "app/store";
import { MapProvider } from "features/map";
import { DropdownProvider } from "shared/lib";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "app/store/store";

interface IProviders {
    children: ReactNode;
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <MapProvider>
                    <DropdownProvider>
                        {children}
                    </DropdownProvider>
                </MapProvider>
            </PersistGate>
        </Provider>
    )
}