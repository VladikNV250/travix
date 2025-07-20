import { Image } from 'entities/image';

export interface StopFormData {
	address: string;
	arrivalDate: string;
	departureDate: string;
	notes: string;
	images: Image[];
}
