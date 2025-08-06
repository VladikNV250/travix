import { FC } from 'react';

import { MoreHorizontal } from 'lucide-react';

import { Button } from 'shared/ui';

export const ActionsButton: FC = () => {
	return (
		<Button
			variant="icon"
			size="icon-md"
			aria-label="More actions"
		>
			<MoreHorizontal className="size-5" />
		</Button>
	);
};
