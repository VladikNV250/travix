import { FC, useState,  } from "react";
import { Header } from "widgets/header";
import { Sidebar } from "widgets/sidebar";
import "leaflet/dist/leaflet.css";
import styles from "./style.module.scss";
import { Map } from "leaflet";
import { MapWidget } from "widgets/map";

const HomePage: FC = () => {
    const [map, setMap] = useState<Map | null>(null);


    return (
        <main className={styles["home-page"]}>
            <Header />
            <Sidebar map={map} />
            <div className={styles["map"]}>
                <MapWidget ref={setMap} />
            </div>
        </main>
    )
}

export default HomePage;