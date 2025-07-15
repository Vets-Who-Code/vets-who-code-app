import clsx from "clsx";

type TProps = {
    className?: string;
    onClick: () => void;
    color?: "light" | "dark";
    label?: string;
};

const BurgerButton = ({ className, onClick, color, label }: TProps) => {
    const baseClass = "tw:relative tw:block tw:overflow-hidden tw:w-6 tw:h-0.5";
    const beforeClass =
        "tw:before:absolute tw:before:content-[''] tw:before:top-0 tw:before:left-0 tw:before:flex-100 tw:before:w-full tw:before:h-full tw:before:scale-x-[1px] tw:before:transition-transform tw:before:duration-600 tw:before:ease-in-expo";
    const afterClass =
        "tw:after:absolute tw:after:content-[''] tw:after:top-0 tw:after:left-0 tw:after:flex-100 tw:after:w-full tw:after:h-full tw:after:scale-x-0 tw:after:transition-transform tw:after:duration-600 tw:after:ease-in-expo";
    const hoverBeforeClass =
        "tw:group-hover:before:scale-x-0 tw:group-hover:before:transition-transform tw:group-hover:before:duration-600 tw:group-hover:before:ease-in-expo";
    const hoverAfterClass =
        "tw:group-hover:after:scale-x-[1px] tw:group-hover:after:transition-transform tw:group-hover:after:duration-600 tw:group-hover:after:delay-200 tw:group-hover:after:ease-in-expo";
    const darkColor =
        color === "dark" &&
        "tw:before:bg-dark tw:group-hover:before:bg-primary tw:after:bg-dark tw:group-hover:before:bg-primary";
    const lightColor =
        color === "light" &&
        "tw:before:bg-white tw:group-hover:before:bg-white tw:after:bg-white tw:group-hover:before:bg-white";

    return (
        <button
            aria-label={label}
            type="button"
            onClick={onClick}
            className={clsx("toggle tw:group", className)}
        >
            <i
                className={clsx(
                    "icon-top",
                    baseClass,
                    beforeClass,
                    afterClass,
                    "tw:before:origin-right",
                    "tw:after:origin-left",
                    hoverBeforeClass,
                    hoverAfterClass,
                    darkColor,
                    lightColor
                )}
            />
            <i
                className={clsx(
                    "icon-middle tw:mt-1.5",
                    baseClass,
                    beforeClass,
                    afterClass,
                    "tw:before:origin-left",
                    "tw:after:origin-right",
                    hoverBeforeClass,
                    hoverAfterClass,
                    darkColor,
                    lightColor
                )}
            />
            <i
                className={clsx(
                    "icon-bottom tw:mt-1.5",
                    baseClass,
                    beforeClass,
                    afterClass,
                    "tw:before:origin-right",
                    "tw:after:origin-left",
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
