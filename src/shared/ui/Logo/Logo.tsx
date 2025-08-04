import { forwardRef } from 'react';

import { Route } from 'lucide-react';

export const Logo = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div
			ref={ref}
			className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"
		>
			<Route className="h-5 w-5 text-white" />
		</div>
	);
});

Logo.displayName = 'Logo';
