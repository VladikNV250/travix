import { useEffect, useState } from "react";
import { TripAnimator } from "../TripAnimator";

export const useTripAnimatorState = <T extends keyof TripAnimator>(
    tripAnimator: TripAnimator | null,
    key: T,
    defaultValue: TripAnimator[T]
) => {
    const [state, setState] = useState<TripAnimator[T]>(defaultValue);

    useEffect(() => {
        if (tripAnimator) {
            tripAnimator[key] = state;
        }
    }, [state, tripAnimator, key]);

    return [state, setState] as const;
}