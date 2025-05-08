import styles from "./style.module.scss";

export const FallbackLoader = () => (
    <div className={styles.loaderContainer}>
        <div className={styles.loader} />
    </div>
)