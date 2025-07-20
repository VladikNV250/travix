import * as LZString from 'lz-string';

export const encodeData = (data: unknown): string => {
	return LZString.compressToEncodedURIComponent(JSON.stringify(data));
};

export const decodeData = <T = unknown>(data: string): T => {
	return JSON.parse(LZString.decompressFromEncodedURIComponent(data)) as T;
};
