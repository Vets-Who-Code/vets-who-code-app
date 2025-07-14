import clsx from "clsx";

const CloseButton = ({ onClose }: { onClose: () => void }) => {
    const baseClass =
        "tw:absolute tw:left-1/2 tw:top-1/2 tw:w-[29px] tw:h-0.5 tw:origin-center tw:-translate-x-1/2 tw:-translate-y-1/2";
    const beforeClass =
        "tw:before:absolute tw:before:inset-0 tw:before:content-[''] tw:before:bg-dark tw:before:origin-right tw:before:scale-x-[1px] tw:before:transition-transform tw:before:duration-600 tw:before:ease-in-expo tw:before:delay-200";
    const afterClass =
        "tw:after:absolute tw:after:inset-0 tw:after:content-[''] tw:after:bg-dark tw:after:origin-left tw:after:scale-x-0 tw:after:transition-transform tw:after:duration-600 tw:after:ease-in-expo";
    const beforeHoverClass =
        "tw:group-hover:before:bg-dark-50 tw:group-hover:before:scale-x-0 tw:group-hover:before:transition-transform tw:group-hover:before:duration-600 tw:group-hover:before:ease-in-expo tw:group-hover:before:delay-0";

    const afterHoverClass =
        "tw:group-hover:after:bg-dark-50 tw:group-hover:after:scale-x-[1px] tw:group-hover:after:transition-transform tw:group-hover:after:duration-600 tw:group-hover:after:ease-in-expo tw:group-hover:after:delay-200";

    return (
        <button
            type="button"
            className="close-btn tw:group tw:relative tw:h-10 tw:w-10 tw:hover:cursor-pointer"
            onClick={onClose}
        >
            <i
                className={clsx(
                    "icon-top",
                    baseClass,
                    "tw:rotate-45",
                    beforeClass,
                    afterClass,
                    beforeHoverClass,
                    afterHoverClass
                )}
            />
            <i
                className={clsx(
                    "icon-bottom",
                    baseClass,
                    "tw:-rotate-45",
                    beforeClass,
                    afterClass,
                    beforeHoverClass,
                    afterHoverClass
                )}
            />
        </button>
    );
};

export default CloseButton;
