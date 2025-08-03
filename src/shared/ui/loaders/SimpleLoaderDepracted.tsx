import { FC } from 'react';

import clsx from 'clsx';

interface SimpleLoaderProps {
	readonly loading?: boolean;
	readonly className?: string;
}

export const SimpleLoaderDepracted: FC<SimpleLoaderProps> = ({
	loading = true,
	className,
}) => {
	return loading ? (
		<div className={clsx('flex items-center justify-center', className)}>
			<div
				className={clsx(
					'relative size-12.5 animate-spin rounded-full border-8 border-transparent border-r-amber-500/60',
					"after:animate-spin-2s after:absolute after:-inset-2 after:rounded-full after:border-8 after:border-transparent after:border-r-amber-500/60 after:content-['']",
					"before:animate-spin-4s before:absolute before:-inset-2 before:rounded-full before:border-8 before:border-transparent before:border-r-amber-500/60 before:content-['']",
				)}
			/>
		</div>
	) : null;
};
