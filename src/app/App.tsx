import { Providers } from './providers';
import { AppRouter } from './router';

const App = () => {
	return (
		<Providers>
			<AppRouter />
		</Providers>
	);
};

export default App;
