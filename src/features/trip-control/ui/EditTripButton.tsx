import { FC } from 'react';
import { Link } from 'react-router';

import { Edit3 } from 'lucide-react';

import { Button } from 'shared/ui';

interface EditTripButtonProps {
	tripId: string | undefined;
}

export const EditTripButton: FC<EditTripButtonProps> = ({ tripId }) => {
	return (
		<Button
			variant="icon"
			size="icon-md"
			asChild
		>
			<Link to={tripId ? `/trip/${tripId}/edit` : '/'}>
				<Edit3 className="size-5" />
			</Link>
		</Button>
	);
};
