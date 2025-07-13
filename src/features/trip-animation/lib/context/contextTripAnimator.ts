import { createContext } from 'react';

import { TripAnimator } from '../TripAnimator';

export interface TripAnimatorContext {
	tripAnimator: TripAnimator | null;
	setTripAnimator: (animator: TripAnimator | null) => void;
}

export const TripAnimatorContext = createContext<TripAnimatorContext>(null!);
