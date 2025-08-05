import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { Slot } from '@radix-ui/themes';
import { twMerge } from 'tailwind-merge';

import { ButtonSize, ButtonVariant, SIZES, VARIANTS } from './button.config';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	size?: ButtonSize;
	variant?: ButtonVariant;
	asChild?: boolean;
}

export const Button: FC<ButtonProps> = ({
	variant = 'base',
	size = 'md',
	className = '',
	asChild,
	children,
	...props
}) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			className={twMerge(
				'flex items-center rounded-xl font-medium transition-all duration-200 disabled:cursor-default disabled:opacity-50',
				VARIANTS[variant],
				SIZES[size],
				className,
			)}
			{...props}
		>
			{children}
		</Comp>
	);
};
