import { FC } from "react";
import { useTripAnimator, useTripAnimatorPlayer } from "features/trip-animation/lib";
import styles from "./style.module.scss";
import { LatLngExpression } from "leaflet";
import { Pause, Play } from "shared/assets";

interface ITripPlayButton {
    stops: LatLngExpression[];
}

export const TripPlayButton: FC<ITripPlayButton> = ({ stops }) => {
    const tripAnimator = useTripAnimator();    
    const [playState, handlePlayClick] = useTripAnimatorPlayer(tripAnimator);

    return (
        <button 
            onClick={() => handlePlayClick(stops)}
            className={styles.animationButton}
        >
            {playState === 'playing' ? (
                <Pause width={20} height={20} />
            ) : (
                <Play width={20} height={20} />
            )}
        </button>
    )
}