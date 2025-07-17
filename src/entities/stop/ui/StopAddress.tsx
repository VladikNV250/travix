import { FC } from 'react';

import { Stop } from 'entities/stop/model/types';

interface StopAddressProps {
	stop: Stop;
}

export const StopAddress: FC<StopAddressProps> = ({ stop }) => {
	return <p className="line-clamp-1 max-w-50 text-ellipsis">{stop.address}</p>;
};
