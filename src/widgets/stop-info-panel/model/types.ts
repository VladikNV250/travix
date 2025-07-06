import { Image } from 'entities/image';

export interface StopInfoData {
	title: string | null;
	subtitle: string | null;
	date: string;
	notes: string;
	images: Image[];
}
