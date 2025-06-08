import { FC, ReactNode, useRef } from "react";
import { TripAnimator } from "../TripAnimator";
import { TripAnimatorContext } from "./contextTripAnimator";

interface ITripAnimatorProvider {
    children: ReactNode
}

export const TripAnimatorProvider: FC<ITripAnimatorProvider> = ({ children }) => {
    const animatorRef = useRef<TripAnimator | null>(null);

    return (
        <TripAnimatorContext.Provider value={animatorRef}>
            {children}
        </TripAnimatorContext.Provider>
    )
}