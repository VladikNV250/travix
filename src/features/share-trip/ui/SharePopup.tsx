import { FC, useMemo } from 'react';

import { Trip } from 'entities/trip';
import { Button } from 'shared/ui';

import { generateShareCode } from '../lib/generateShareCode';

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
	const code = useMemo(() => generateShareCode(trip), [trip]);

	console.log(code);
	if (!isOpen) return null;

	return (
		<div className="fixed top-0 left-0 z-20 flex size-full items-center justify-center bg-black/35">
			<div className="flex flex-col gap-x-4 rounded-xl bg-white p-2 pb-1">
				<header className="flex flex-col">
					<h3 className="text-2xl font-medium">Share trip</h3>
					<h4 className="text-base text-zinc-800 italic">
						Copy link below and send your friend to share this trip
					</h4>
				</header>
				<textarea
					className="w-100 min-w-80 resize-none rounded-2xl bg-zinc-300 p-4"
					rows={8}
					value="I3USAJDKLSADHJAKSSJKH@SHADSJK3&y#t&*#!*y$#ieh!hoe#dugb#!yistgd#u#@gkd@ghDGY1783TEG2YUTR46EGFBYU23GED72QG"
					readOnly
				/>
				<div className="flex items-center justify-end gap-y-2">
					<Button
						className="rounded bg-blue-700 px-4 py-2 text-base text-white"
						onClick={closePopup}
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
