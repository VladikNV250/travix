import { useContext } from "react";
import { TripAnimatorContext, TTripAnimatorContext } from "../context";
import { TripAnimator } from "../TripAnimator";


export function useTripAnimator(ref: true): TTripAnimatorContext;
export function useTripAnimator(ref?: false): TripAnimator | null;
export function useTripAnimator(ref: boolean = false) {
    const animatorRef = useContext(TripAnimatorContext);
    if (!animatorRef) {
        throw new Error("useTripAnimatorContext must be used within a TripAnimatorProvider");
    }
    return ref ? animatorRef : animatorRef.current;
}