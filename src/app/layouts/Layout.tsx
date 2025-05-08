import { FC } from "react";
import { Header } from "widgets/header";
import { Outlet } from "react-router";
import { MapWidget } from "widgets/map";
import styles from "./style.module.scss";

export const Layout: FC = () => {
    return (
        <main className={styles.layout}>
            <Header />
            <nav className={styles.sidebar}>
                <Outlet />
            </nav>
            <div className={styles.map}>
                <MapWidget />
            </div>
        </main>
    )
}