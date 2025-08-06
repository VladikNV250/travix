import { Meta, StoryObj } from '@storybook/react-vite';
import { Settings } from 'lucide-react';

import { Button } from 'shared/ui';

import { Stop } from '../model';
import { StopItem } from './StopItem';

const defaultStop: Stop = {
	address: 'Amsterdam',
	countryCode: 'NL',
	id: '1',
	location: {
		lat: 52.3676,
		lng: 4.9041,
	},
	arrivalDate: '2025-08-06',
	departureDate: '2025-08-09',
	images: [],
};

const meta: Meta<typeof StopItem> = {
	title: 'Stop/StopItem',
	component: StopItem,
	tags: ['autodocs'],
	args: {
		stop: defaultStop,
		order: 1,
		isLast: true,
	},
	argTypes: {
		stop: { control: 'object', description: 'Displayed stop object' },
		order: { control: 'number', description: 'Order of stop in the list' },
		isLast: {
			control: 'boolean',
			description: 'Determines if stop is last in the list',
		},
		actionSlot: {
			control: 'text',
			description: 'Slot for additional actions, like buttons or icons',
		},
	},
};

export default meta;

type Story = StoryObj<typeof StopItem>;

export const Default: Story = {};

export const ManyItems: Story = {
	render: args => (
		<div className="mx-auto flex w-80 flex-col border border-gray-200">
			<StopItem
				{...args}
				order={1}
				isLast={false}
			/>
			<StopItem
				{...args}
				stop={{ ...args.stop, address: 'Paris', countryCode: 'FR', id: '2' }}
				order={2}
				isLast={false}
			/>
			<StopItem
				{...args}
				stop={{ ...args.stop, address: 'Berlin', countryCode: 'DE', id: '3' }}
				order={3}
				isLast={true}
			/>
		</div>
	),
	argTypes: {
		stop: { table: { disable: true } },
		order: { table: { disable: true } },
		isLast: { table: { disable: true } },
		actionSlot: { table: { disable: true } },
	},
};

export const WithActionSlot: Story = {
	args: {
		...meta.args,
		actionSlot: (
			<Button
				variant="icon"
				size="icon-md"
			>
				<Settings className="size-5" />
			</Button>
		),
	},
};
