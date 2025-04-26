import {
    ButtonHTMLAttributes,
    FC,
    forwardRef,
    ReactNode
} from "react";
import clsx from "clsx";
import styles from "./style.module.scss";


interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Button: FC = forwardRef<HTMLButtonElement, IButton>((
    {
        type = "button",
        disabled = false,
        className = '',
        leftIcon,
        children,
        rightIcon,
        isLoading = false,
        fullWidth = false,
        ...props
    },
    ref
) => {
    const isDisabled = disabled || isLoading;

    return (
        <button
            ref={ref}
            type={type}
            disabled={isDisabled}
            className={clsx(
                styles.button,
                isDisabled && styles.disabled,
                fullWidth && styles.fullWidth,
                className,
            )}
            {...props}
        >
            {isLoading ? (
                <span>Loading..</span>
            ) : (
                <>
                    {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
                </>
            )}
        </button>
    )
}) 