import { FC } from 'react';
import { Link } from 'react-router';

import { Import, Plus } from 'lucide-react';

import { Button, Logo } from 'shared/ui';

export const Header: FC = () => {
	return (
		<header className="z-10 w-full border-b border-gray-100 p-6">
			<Link
				to={'/'}
				className="mb-6 flex items-center gap-3"
			>
				<Logo />
				<h1 className="text-xl font-bold text-gray-900">Travix</h1>
			</Link>
			<div className="space-y-3">
				<Button
					variant="primary-gradient"
					size="lg"
					className="w-full"
				>
					<Plus className="size-5" />
					Add New Trip
				</Button>
				<Button
					variant="base"
					size="lg"
					className="w-full"
				>
					<Import className="size-5" />
					Import Trip
				</Button>
			</div>
		</header>
	);
};
