import { FC } from "react";
import { Outlet } from "react-router";
import { Header } from "widgets/header";
import { MapWidget } from "widgets/map-widget";
import { StopInfoPanel } from "widgets/stop-info-panel";
import styles from "./style.module.scss";

export const Layout: FC = () => {
    return (
        <main className={styles.layout}>
            <Header />
            <nav className={styles.sidebar}>
                <Outlet />
            </nav>
            <div className={styles.map}>
                <StopInfoPanel />
                <MapWidget />
            </div>
        </main>
    )
}