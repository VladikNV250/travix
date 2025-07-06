import { ReactNode, Suspense } from 'react';

import { FallbackLoader } from 'shared/ui';

export const withSuspense = (Component: ReactNode) => {
	return <Suspense fallback={<FallbackLoader />}>{Component}</Suspense>;
};
