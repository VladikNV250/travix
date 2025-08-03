import { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	args: {
		placeholder: 'Enter text..',
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label of input',
		},
		error: {
			control: 'text',
			description: 'Message about error, displayed under input',
		},
		className: {
			control: 'text',
			description: 'Additional classes',
		},
		type: {
			control: 'select',
			options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
			description: 'Type of input',
		},
		value: {
			control: 'text',
			description: 'Current value of input (controlled component)',
		},
		defaultValue: {
			control: 'text',
			description: 'Default value of input (uncontrolled component)',
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text of input',
		},
		disabled: {
			control: 'boolean',
			description: 'Determines if input is inactive',
		},
		readOnly: {
			control: 'text',
			description: 'Determines if input is available only for reading',
		},
		required: {
			control: 'text',
			description: 'Determines if input is required',
		},
		onChange: {
			action: 'changed',
			description: 'Change event handler',
		},
		onFocus: {
			action: 'focused',
			description: 'Focus event handler',
		},
		onBlur: {
			action: 'blurred',
			description: 'Blur event handler',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {},
};

export const WithLabel: Story = {
	args: {
		label: 'First name',
		id: 'name-input',
	},
};

export const WithError: Story = {
	args: {
		label: 'Email',
		id: 'email-input',
		error: 'Please, enter correct email',
		defaultValue: 'invalid@mail.com',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled field',
		id: 'disabled-input',
		defaultValue: 'Inactive text input',
		disabled: true,
	},
};

export const InputTypes: Story = {
	render: args => (
		<div className="mx-auto grid w-1/2 grid-cols-2 grid-rows-3 gap-x-10 gap-y-4">
			<Input
				{...args}
				label="Text field"
				type="text"
				id="text-type"
				placeholder="Simple text"
			/>
			<Input
				{...args}
				label="Email field"
				type="email"
				id="email-type"
				placeholder="your@mail.com"
			/>
			<Input
				{...args}
				label="Password field"
				type="password"
				id="password-type"
				placeholder="Your password"
			/>
			<Input
				{...args}
				label="Number field"
				type="number"
				id="number-type"
				placeholder="Enter number"
			/>
			<Input
				{...args}
				label="Telephone field"
				type="tel"
				id="tel-type"
				placeholder="+380 (XX) XXX XX XX"
			/>
		</div>
	),
	argTypes: {
		type: { table: { disable: true } },
		label: { table: { disable: true } },
		placeholder: { table: { disable: true } },
	},
};
