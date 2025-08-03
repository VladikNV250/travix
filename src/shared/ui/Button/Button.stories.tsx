import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';
import { ButtonSize, SIZES, VARIANTS } from './button.config';
import { TrashIcon } from 'shared/assets';

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	args: {
		children: 'Click Me',
		variant: 'base',
		size: 'md',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: Object.keys(VARIANTS),
			description: 'Variant of button',
		},
		size: {
			control: 'select',
			options: Object.keys(SIZES),
			description: 'Sizes of button',
		},
		className: {
			control: 'text',
			description: 'Additional classes',
		},
		asChild: {
			control: 'boolean',
			description: 'Render as child element instead of "button"',
		},
		children: {
			control: 'text',
			description: 'Content of button (ReactNode or text)',
		},
		onClick: {
			action: 'clicked',
			description: 'Click event handler',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		variant: 'primary',
		children: 'Primary Button',
	},
};

export const PrimaryGradient: Story = {
	args: {
		variant: 'primary-gradient',
		size: 'lg',
		children: 'Primary Gradient',
	},
};

export const Sizes: Story = {
	render: args => (
		<div className="flex flex-wrap gap-2 items-center">
			{Object.keys(SIZES).map(size => (
				<Button
					key={size}
					{...args}
					size={size as ButtonSize}
				>
					Button {size.toUpperCase()}
				</Button>
			))}
		</div>
	),
	argTypes: {
		size: {
			table: {
				disable: true,
			},
		},
		children: {
			table: {
				disable: true,
			},
		},
	},
};

export const AsChildLink: Story = {
    args: {
        asChild: true,
        children: (
            <a href='https://example.com' target='_blank' rel='noopener noreferrer'>
                Link as button
            </a>
        )
    },
    argTypes: {
        children: {
            table: {
                disable: true
            }
        }
    }
} 

export const Disabled: Story = {
    args: {
        disabled: true,
        children: "Disabled Button"
    },
}

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <TrashIcon className='size-5' />
                Remove
            </>
        )
    },
    argTypes: {
        children: {
            table: {
                disable: true
            }
        }
    }
}