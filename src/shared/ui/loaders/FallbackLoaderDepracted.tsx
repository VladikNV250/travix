import { FC } from 'react';

export const FallbackLoaderDepracted: FC = () => (
	<div className="fixed top-0 left-0 flex size-full items-center justify-center bg-blue-800">
		<div className="size-15 animate-spin rounded-full border-10 border-white" />
	</div>
);
