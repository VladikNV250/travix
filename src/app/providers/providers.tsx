import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { store } from 'app/store';
import { persistor } from 'app/store/store';
import { MapProvider } from 'features/map';
import { TripAnimatorProvider } from 'features/trip-animation';
import { DropdownProvider } from 'shared/lib';

interface ProvidersProps {
	children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<MapProvider>
					<TripAnimatorProvider>
						<DropdownProvider>{children}</DropdownProvider>
					</TripAnimatorProvider>
				</MapProvider>
			</PersistGate>
		</Provider>
	);
};
