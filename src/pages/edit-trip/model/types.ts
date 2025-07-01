import { ChangeEvent } from 'react';

export interface EditTripFormData {
	name: string;
	color: string;
}

export interface IEditTripViewModel {
	tripId: string | undefined;
	formData: EditTripFormData;
	isColorPickerOpen: boolean;
	onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onColorChange: (newColor: string) => void;
	onToggleColorPicker: () => void;
	onSaveTrip: () => void;
	onGoBack: () => void;
	isFormValid: boolean;
	tripExists: boolean;
}
