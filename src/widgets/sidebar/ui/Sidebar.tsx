import { FC, useEffect, useState } from "react";
import { Map } from "leaflet";
import { geocodePlace } from "features/geocode-place";
import styles from "./style.module.scss";
import { useDebounce } from "use-debounce";
import { autocompletePlace, Prediction } from "features/place-autocomplete";

interface ISidebar {
    readonly map: Map | null; 
}

export const Sidebar: FC<ISidebar> = ({ map }) => {
    const [input, setInput] = useState('');
    const [debouncedInput] = useDebounce(input, 400);
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    useEffect(() => {
        (async () => {
            try {
                if (!debouncedInput) {
                    setPredictions([]);
                    return;
                }

                const predictions = await autocompletePlace(debouncedInput);
                setPredictions(predictions);

                return 
            } catch (e) {
                console.error("Render error: ", e);
                setPredictions([]);
            }
        })()
    }, [debouncedInput])

    const handleClick = async (input: string) => {
        const location = await geocodePlace(input);

        map?.setView([location.lat, location.lng]);
    };

    return (
        <nav className={styles.sidebar}>
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter place"
            />
            <button
                onClick={async () => await handleClick(debouncedInput)}
            >
                Find
            </button>
            <div className={styles.sidebarPlaceList}>
                {predictions.length > 0
                ?
                predictions.map((prediction) =>
                    <p 
                        key={prediction.place_id} 
                        className={styles.sidebarPlaceListItem}
                        onClick={async () => await handleClick(prediction.description)}
                    >
                        {prediction.description}
                    </p>
                )
                :
                null
                }
            </div>
        </nav>
    )
}