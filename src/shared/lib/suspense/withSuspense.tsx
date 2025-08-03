import { ReactNode, Suspense } from 'react';

import { FallbackLoaderDepracted } from 'shared/ui';

export const withSuspense = (Component: ReactNode) => {
	return (
		<Suspense fallback={<FallbackLoaderDepracted />}>{Component}</Suspense>
	);
};
