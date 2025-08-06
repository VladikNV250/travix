import { FC, ReactNode } from 'react';

import { Stop } from '../model';

interface StopItemProps {
	stop: Stop;
	order: number;
	isLast?: boolean;
	actionSlot?: ReactNode;
}

export const StopItem: FC<StopItemProps> = ({
	stop,
	order,
	isLast = false,
	actionSlot,
}) => {
	return (
		<div className="cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-gray-50">
			<div className="flex items-start gap-4">
				<div className="flex flex-col items-center">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
						{order}
					</div>
					{!isLast && <div className="mt-2 h-8 w-px bg-gray-200" />}
				</div>
				<div className="min-w-0 flex-1">
					<h4 className="truncate font-medium text-gray-900">{stop.address}</h4>
					<p className="mt-1 text-sm text-gray-500">{stop.countryCode}</p>
				</div>
				{actionSlot}
			</div>
		</div>
	);
};
