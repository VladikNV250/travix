export interface Image {
	readonly id: string;
	readonly url: string;
}

export type ImageRaw = [
	/** image id */
	string,
	/** image url */
	string,
];
