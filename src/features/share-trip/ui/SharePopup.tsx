import { FC } from 'react';

import { Trip } from 'entities/trip';
import { Button } from 'shared/ui';

import { useShareCode } from '../lib';

interface SharePopupProps {
	trip: Trip | null;
	isOpen: boolean;
	closePopup: () => void;
}

export const SharePopup: FC<SharePopupProps> = ({
	trip,
	isOpen,
	closePopup,
}) => {
	const { code, copyCode, textareaRef } = useShareCode(trip);

	if (!isOpen || !code) return null;

	return (
		<div className="fixed top-0 left-0 z-20 flex size-full items-center justify-center bg-black/35">
			<div className="flex flex-col gap-x-4 gap-y-4 rounded-xl bg-white p-4 pb-2">
				<header className="flex flex-col">
					<h3 className="text-2xl font-medium">Share trip</h3>
					<h4 className="text-base text-zinc-800 italic">
						Copy code below and send your friend to share this trip
					</h4>
				</header>
				<div className="w-100 min-w-80 rounded-2xl bg-zinc-300 p-4">
					<textarea
						ref={textareaRef}
						className="no-scrollbar w-full resize-none focus:outline-0"
						rows={8}
						value={code}
						readOnly
					/>
				</div>
				<div className="flex items-center justify-end gap-x-2">
					<Button
						className="rounded bg-blue-700 px-4 py-2 text-base text-white"
						onClick={copyCode}
					>
						Copy
					</Button>
					<Button
						className="rounded bg-rose-700 px-4 py-2 text-base text-white"
						onClick={closePopup}
					>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
};
