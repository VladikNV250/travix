import { createContext, RefObject } from "react";
import { TripAnimator } from "../TripAnimator";

export type TTripAnimatorContext = RefObject<TripAnimator | null>

export const TripAnimatorContext = createContext<TTripAnimatorContext>(null!);