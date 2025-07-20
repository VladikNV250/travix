import { FC, useState } from 'react';

import { Button } from 'shared/ui';

import { ImportStatus, useImportTrip } from '../lib';

interface ImportPopupProps {
	isOpen: boolean;
	closePopup: () => void;
}

export const ImportPopup: FC<ImportPopupProps> = ({ isOpen, closePopup }) => {
	const [code, setCode] = useState('');
	const { importTrip, error } = useImportTrip();

	const importTripHandle = () => {
		const status = importTrip(code);
		if (status === ImportStatus.SUCCESS) {
			setCode('');
			closePopup();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed top-0 left-0 z-20 flex size-full items-center justify-center bg-black/35">
			<div className="flex flex-col gap-x-4 gap-y-4 rounded-xl bg-white p-4 pb-2">
				<header className="flex flex-col">
					<h3 className="text-2xl font-medium">Import trip</h3>
					<h4 className="text-base text-zinc-800 italic">
						Paste code below to add trip
					</h4>
					{error && <h4 className="mt-2 text-base text-rose-700">{error}</h4>}
				</header>
				<div className="w-100 min-w-80 rounded-2xl bg-zinc-300 p-4">
					<input
						className="no-scrollbar w-full resize-none focus:outline-0"
						value={code}
						onChange={e => setCode(e.target.value)}
					/>
				</div>
				<div className="flex items-center justify-end gap-x-2">
					<Button
						className="rounded bg-blue-700 px-4 py-2 text-base text-white"
						onClick={importTripHandle}
					>
						Import
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
