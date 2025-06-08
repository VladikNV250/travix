import { useTripAnimator } from "features/trip-animation/lib"
import { FC } from "react"
import { Play } from "shared/assets";
import styles from "./style.module.scss";

export const TripContinueButton: FC = () => {
    const tripAnimator = useTripAnimator();

    return (
        <button onClick={() => tripAnimator?.continueAnimation()}>
            <Play width={20} height={20} />
        </button>
    )
}