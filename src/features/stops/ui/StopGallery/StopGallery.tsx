import { FC } from "react";
import styles from "./style.module.scss";
import { Image } from "entities/stop/image";
import { Trash } from "shared/assets";

interface IStopGallery {
    images: Image[];
    onDelete: (id: string) => void
}

export const StopGallery: FC<IStopGallery> = ({ images, onDelete }) => {

    return (
        images.length > 0 &&
        <div className={styles.gallery}>
            <h2 className={styles.title}>Stop Gallery</h2>
            <div className={styles.galleryContainer}>
                {images.map(image => 
                    <div key={image.id} className={styles.galleryImage}>
                        <img 
                            className={styles.image} 
                            src={image.url} 
                        />
                        <button 
                            type="button"
                            className={styles.button}
                            onClick={() => onDelete(image.id)}
                        >
                            <Trash width={20} height={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}