import { FC } from 'react';

import { Share2 } from 'lucide-react';

import { Button } from 'shared/ui';

export const OpenShareButton: FC = () => {
	return (
		<Button
			variant="icon"
			size="icon-md"
		>
			<Share2 className="size-5" />
		</Button>
	);
};
