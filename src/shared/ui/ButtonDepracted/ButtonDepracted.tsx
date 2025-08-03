import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	fullWidth?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

export const ButtonDepracted = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			type = 'button',
			disabled = false,
			className = '',
			leftIcon,
			children,
			rightIcon,
			isLoading = false,
			// fullWidth = false,
			...props
		},
		ref,
	) => {
		const isDisabled = disabled || isLoading;

		return (
			<button
				ref={ref}
				type={type}
				disabled={isDisabled}
				className={clsx(
					// styles.button,
					// isDisabled && styles.disabled,
					// fullWidth && styles.fullWidth,
					className,
				)}
				{...props}
			>
				{isLoading ? (
					<span>Loading..</span>
				) : (
					<>
						{leftIcon && <span>{leftIcon}</span>}
						{children}
						{rightIcon && <span>{rightIcon}</span>}
					</>
				)}
			</button>
		);
	},
);

ButtonDepracted.displayName = 'ButtonDepracted';
