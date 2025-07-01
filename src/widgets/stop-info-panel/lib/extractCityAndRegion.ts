export const extractCityAndRegion = (
	address: string | null,
): [string | null, string | null] => {
	if (address) {
		const splitted = address.split(', ');
		return [splitted[0], splitted.slice(1).join(', ') || null];
	} else {
		return [null, null];
	}
};
