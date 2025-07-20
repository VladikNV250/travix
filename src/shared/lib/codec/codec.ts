import * as LZString from 'lz-string';

export const compressData = (data: unknown): string => {
	return LZString.compressToEncodedURIComponent(JSON.stringify(data));
};

export const decompressData = <T = unknown>(data: string): T => {
	return JSON.parse(LZString.decompressFromEncodedURIComponent(data)) as T;
};
