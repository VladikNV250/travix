import { createContext } from "react";
import { TripAnimator } from "../TripAnimator";

// export type TTripAnimatorContext = RefObject<TripAnimator | null>
export interface ITripAnimatorContext {
    tripAnimator: TripAnimator | null;
    setTripAnimator: (animator: TripAnimator | null) => void;
}

export const TripAnimatorContext = createContext<ITripAnimatorContext>(null!);