import { FC } from 'react';

import { Stop } from 'entities/stop/model/types';

import styles from './style.module.scss';

interface StopAddressProps {
	stop: Stop;
}

export const StopAddress: FC<StopAddressProps> = ({ stop }) => {
	return <p className={styles.stopAddress}>{stop.address}</p>;
};
