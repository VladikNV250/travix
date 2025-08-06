import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { Theme } from '@radix-ui/themes';
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
		<BrowserRouter>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Theme>
						<MapProvider>
							<TripAnimatorProvider>
								<DropdownProvider>{children}</DropdownProvider>
							</TripAnimatorProvider>
						</MapProvider>
					</Theme>
				</PersistGate>
			</Provider>
		</BrowserRouter>
	);
};
