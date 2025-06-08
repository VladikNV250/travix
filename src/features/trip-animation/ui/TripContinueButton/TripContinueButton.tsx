import { useTripAnimator } from "features/trip-animation/lib"
import { FC } from "react"
import { Play } from "shared/assets";
import styles from "./style.module.scss";
import { useAppSelector } from "shared/lib";
import { selectTripAnimator } from "features/trip/model/selectors";

export const TripContinueButton: FC = () => {
    const { tripAnimator } = useTripAnimator();
    // const tripAnimator = useAppSelector(selectTripAnimator);

    return (
        <button onClick={() => tripAnimator?.continueAnimation()}>
            <Play width={20} height={20} />
        </button>
    )
}