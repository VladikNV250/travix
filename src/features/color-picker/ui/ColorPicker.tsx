import { FC } from 'react';

import clsx from 'clsx';
import { Check } from 'lucide-react';

interface ColorPickerProps {
	onChange: (color: string) => void;
	selectedColor: string;
	colors: string[];
	className?: string;
}

export const ColorPicker: FC<ColorPickerProps> = ({
	colors,
	onChange,
	selectedColor,
	className,
}) => {
	return (
		<div className={className}>
			<h5 className="mb-3 block text-sm font-medium text-gray-700">
				Choose Color
			</h5>
			<div className="grid grid-cols-4 gap-3">
				{colors.map(color => {
					const isSelected = selectedColor === color;
					return (
						<button
							key={color}
							type="button"
							onClick={() => onChange(color)}
							className={clsx(
								'flex size-12 items-center justify-center rounded-lg transition-all duration-200',
								isSelected
									? 'scale-110 ring-4 ring-blue-200'
									: 'hover:scale-105',
							)}
							style={{ backgroundColor: color }}
						>
							{isSelected && <Check className="size-5 text-white" />}
						</button>
					);
				})}
			</div>
		</div>
	);
};
