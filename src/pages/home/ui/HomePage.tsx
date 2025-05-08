import { FC } from "react";
import { Link, useNavigate } from "react-router";
import { addTrip, createTrip, selectTrips } from "features/trip";
import { useAppDispatch, useAppSelector } from "shared/lib";
import styles from "./style.module.scss";

const HomePage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const trips = useAppSelector(selectTrips);

    const handleCreate = () => {
        const trip = createTrip();

        if (trip) {
            dispatch(addTrip(trip));
            navigate(`/trip/${trip.id}/edit`);
        }
    }

    return (
        <div className={styles.home}>
            <button 
                onClick={handleCreate} 
                className={styles.button}
            >
                Add New Trip
            </button>
            <div className={styles.tripList}>
                {trips.map(trip => 
                    <div key={trip.id} className={styles.trip}>
                        <Link to={`/trip/${trip.id}`}>
                            {trip.name}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage;