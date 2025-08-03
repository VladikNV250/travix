import { InputHTMLAttributes, forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className = '', ...props }, ref) => (
		<div className={twMerge('flex flex-col', className)}>
			{label && (
				<label
					htmlFor={props.id}
					className="mb-2 text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			)}
			<input
				ref={ref}
				className="mb-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
				{...props}
			/>
			{error && <span className="text-xs text-rose-500">{error}</span>}
		</div>
	),
);

Input.displayName = 'Input';
