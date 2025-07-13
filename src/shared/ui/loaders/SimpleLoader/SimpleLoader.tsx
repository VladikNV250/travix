import { FC } from 'react';

import clsx from 'clsx';

import styles from './style.module.scss';

interface SimpleLoaderProps {
	readonly loading?: boolean;
	readonly className?: string;
}

export const SimpleLoader: FC<SimpleLoaderProps> = ({
	loading = true,
	className,
}) => {
	return loading ? (
		<div className={clsx(styles.loaderContainer, className)}>
			<div className={styles.loader} />
		</div>
	) : null;
};
