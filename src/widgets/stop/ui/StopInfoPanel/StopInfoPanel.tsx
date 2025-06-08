import { FC } from "react";
import styles from "./style.module.scss";
import { useAppSelector } from "shared/lib";
import { selectCurrentStop } from "features/routing";
import clsx from "clsx";
import { StopSliderGallery } from "entities/stop";
import { TripContinueButton, useTripAnimator } from "features/trip-animation";

export const StopInfoPanel: FC = () => {
    const stop = useAppSelector(selectCurrentStop);

    return (
        <div 
            className={clsx(
                styles.stopInfoPanel,
                stop && styles.active
            )}
        >
            {stop && (
                <>
                    <h3 className={styles.title}>
                        {stop.address}
                    </h3>
                    <StopSliderGallery gallery={stop.images} />
                    <TripContinueButton />
                </>
            )}
        </div>
    )
}