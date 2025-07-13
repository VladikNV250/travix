// More info about API https://api.imgbb.com/
export interface ImageApi<ResponseData> {
	data: ResponseData;
	success: boolean;
	status: number;
}

export type ImageUploadResponse = ImageApi<ImageDto>;

export interface ImageDto {
	readonly id: string;
	title: string;
	url_viewer: string;
	url: string;
	display_url: string;
	width: string;
	height: string;
	size: string;
	time: string;
	expiration: string;
	image: ImageDetails;
	thumb: ImageDetails;
	medium: ImageDetails;
	delete_url: string;
}

export interface ImageDetails {
	filename: string;
	name: string;
	mime: string;
	extension: string;
	url: string;
}
