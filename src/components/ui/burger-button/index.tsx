import clsx from "clsx";

type TProps = {
    className?: string;
    onClick: () => void;
    color?: "light" | "dark";
    label?: string;
};

const BurgerButton = ({ className, onClick, color, label }: TProps) => {
    const baseClass = "tw-relative tw-block tw-overflow-hidden tw-w-6 tw-h-0.5";
    const beforeClass =
        "before:tw-absolute before:tw-content-[''] before:tw-top-0 before:tw-left-0 before:tw-flex-100 before:tw-w-full before:tw-h-full before:tw-scale-x-[1px] before:tw-transition-transform before:tw-duration-600 before:tw-ease-in-expo";
    const afterClass =
        "after:tw-absolute after:tw-content-[''] after:tw-top-0 after:tw-left-0 after:tw-flex-100 after:tw-w-full after:tw-h-full after:tw-scale-x-0 after:tw-transition-transform after:tw-duration-600 after:tw-ease-in-expo";
    const hoverBeforeClass =
        "group-hover:before:tw-scale-x-0 group-hover:before:tw-transition-transform group-hover:before:tw-duration-600 group-hover:before:tw-ease-in-expo";
    const hoverAfterClass =
        "group-hover:after:tw-scale-x-[1px] group-hover:after:tw-transition-transform group-hover:after:tw-duration-600 group-hover:after:tw-delay-200 group-hover:after:tw-ease-in-expo";
    const darkColor =
        color === "dark" &&
        "before:tw-bg-dark group-hover:before:tw-bg-primary after:tw-bg-dark group-hover:before:tw-bg-primary";
    const lightColor =
        color === "light" &&
        "before:tw-bg-white group-hover:before:tw-bg-white after:tw-bg-white group-hover:before:tw-bg-white";

    return (
        <button
            aria-label={label}
            type="button"
            onClick={onClick}
            className={clsx("toggle tw-group", className)}
        >
            <i
                className={clsx(
                    "icon-top",
                    baseClass,
                    beforeClass,
                    afterClass,
                    "before:tw-origin-right",
                    "after:tw-origin-left",
                    hoverBeforeClass,
                    hoverAfterClass,
                    darkColor,
                    lightColor
                )}
            />
            <i
                className={clsx(
                    "icon-middle tw-mt-1.5",
                    baseClass,
                    beforeClass,
                    afterClass,
                    "before:tw-origin-left",
                    "after:tw-origin-right",
                    hoverBeforeClass,
                    hoverAfterClass,
                    darkColor,
                    lightColor
                )}
            />
            <i
                className={clsx(
                    "icon-bottom tw-mt-1.5",
                    baseClass,
                    beforeClass,
                    afterClass,
                    "before:tw-origin-right",
                    "after:tw-origin-left",
                    hoverBeforeClass,
                    hoverAfterClass,
                    darkColor,
                    lightColor
                )}
            />
        </button>
    );
};

export default BurgerButton;
