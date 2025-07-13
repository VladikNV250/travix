import { ImageDto } from 'entities/image/api';

import { Image } from '../types';

export const mapImageDto = (imageDto: ImageDto): Image => ({
	id: imageDto.id,
	url: imageDto.url,
});
