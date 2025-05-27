import clsx from "clsx";
import { FC } from "react";
import styles from "./style.module.scss";

interface ISimpleLoader {
    readonly loading: boolean,
    readonly className?: string,
}

export const SimpleLoader: FC<ISimpleLoader> = ({ loading, className }) => {
    return (
        loading ? (
            <div 
                className={clsx(
                    styles.loaderContainer,
                    className
                )}
            >
                <div className={styles.loader} />
            </div>
        ) : null
    )
}