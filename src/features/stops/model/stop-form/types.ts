import { 
    ChangeEvent, 
    FormEvent 
} from "react";
import { Prediction } from "features/geo";
import { Image } from "entities/image";
import { Stop } from "entities/stop";
import { Trip } from "entities/trip";

export interface IStopFormViewModelProps {
    tripId: Trip["id"];
    initialData?: Stop;
    onClose?: () => void;
}

export interface StopFormData {
    address: string;
    arrivalDate: string;
    departureDate: string;
    notes: string;
    images: Image[];
}

export interface IStopFormViewModel {
    formData            : StopFormData;
    predictions         : Prediction[];
    onDataChange        : (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onPredictionSelect  : (description: string) => void;
    onAddImage          : (image: Image) => void;
    onDeleteImage       : (id: string) => void;
    onSaveStop          : (e: FormEvent<HTMLFormElement>) => Promise<void>;
    onCancel            : () => void;
    editMode            : boolean;
    hasUnsavedChanges   : boolean;
    isFormValid         : boolean;
    isSubmitting        : boolean;
    submitError         : string | null;  
}
