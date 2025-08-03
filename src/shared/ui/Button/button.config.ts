export const VARIANTS = {
	base: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:hover:bg-gray-100',
	primary:
		'bg-blue-500 text-white hover:bg-blue-600 disabled:hover:bg-blue-500',
	'primary-gradient':
		'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl disabled:hover:from-blue-500 disabled:hover:to-blue-600 disabled:hover:shadow-lg',
};

export const SIZES = {
	lg: 'px-4 py-3 gap-3',
	md: 'px-4 py-2 gap-2',
};

export type ButtonSize = keyof typeof SIZES;
export type ButtonVariant = keyof typeof VARIANTS;
