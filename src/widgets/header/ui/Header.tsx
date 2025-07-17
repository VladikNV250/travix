import { FC } from 'react';

export const Header: FC = () => {
	return (
		<header
			style={{ gridArea: 'header' }}
			className="z-10 w-full bg-neutral-100 px-12.5 pt-4 pb-5"
		>
			Travix
		</header>
	);
};
