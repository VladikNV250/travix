import { BrowserRouter } from 'react-router';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { sb } from 'storybook/test';

import { Trip } from '../model';
import { TripItem } from './TripItem';

sb.mock('../lib');

const defaultTrip: Trip = {
	id: 'trip-1',
	name: 'Travel to Carpathians',
	color: '#FF5733',
	stops: [
		{
			id: 'stop-1',
			address: 'Lviv',
			location: [49.8397, 24.0297],
			countryCode: 'UA',
			arrivalDate: '2025-08-10',
			departureDate: '2025-08-12',
			images: [],
		},
		{
			id: 'stop-2',
			address: 'Vorokhta',
			location: [48.2706, 24.5668],
			countryCode: 'UA',
			arrivalDate: '2025-08-13',
			departureDate: '2025-08-15',
			images: [],
		},
	],
	route: [],
};

const meta: Meta<typeof TripItem> = {
	title: 'Trip/Item',
	component: TripItem,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	args: {
		trip: defaultTrip,
	},
	argTypes: {
		trip: {
			control: 'object',
			description: 'Displated trip object',
		},
	},
	decorators: [
		Story => (
			<BrowserRouter>
				<div style={{ width: '300px' }}>
					{/* Обмежуємо ширину для візуалізації в Storybook */}
					<Story />
				</div>
			</BrowserRouter>
		),
	],
};

export default meta;

type Story = StoryObj<typeof TripItem>;

export const Default: Story = {
	args: {
		trip: { ...defaultTrip }, // Копіюємо, щоб не впливати на дефолтний об'єкт
	},
};

// Історія з довшим ім'ям поїздки
export const LongTripName: Story = {
	args: {
		trip: {
			...defaultTrip,
			color: '#57FF33',
			name: 'Very long trip name. Lorem ipsum dolor si amet Lorem ipsum dolor si ametLorem ipsum dolor si amet Lorem ipsum dolor si amet',
		},
	},
};
