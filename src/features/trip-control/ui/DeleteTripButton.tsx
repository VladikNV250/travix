import { FC } from 'react';

import { Trash2 } from 'lucide-react';

import { Button } from 'shared/ui';

export const DeleteTripButton: FC = () => {
	return (
		<Button
			variant="icon"
			size="icon-md"
		>
			<Trash2 className="size-5" />
		</Button>
	);
};
