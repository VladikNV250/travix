import { FC } from 'react';

import { Edit3 } from 'lucide-react';

import { Button } from 'shared/ui';

export const EditTripButton: FC = () => {
	return (
		<Button
			variant="icon"
			size="icon-md"
		>
			<Edit3 className="size-5" />
		</Button>
	);
};
