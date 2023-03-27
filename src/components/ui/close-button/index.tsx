import clsx from "clsx";

const CloseButton = ({ onClose }: { onClose: () => void }) => {
    const baseClass =
        "tw-absolute tw-left-1/2 tw-top-1/2 tw-w-[29px] tw-h-0.5 tw-origin-center -tw-translate-x-1/2 -tw-translate-y-1/2";
    const beforeClass =
        "before:tw-absolute before:tw-inset-0 before:tw-content-[''] before:tw-bg-dark before:tw-origin-right before:tw-scale-x-[1px] before:tw-transition-transform before:tw-duration-600 before:tw-ease-in-expo before:tw-delay-200";
    const afterClass =
        "after:tw-absolute after:tw-inset-0 after:tw-content-[''] after:tw-bg-dark after:tw-origin-left after:tw-scale-x-0 after:tw-transition-transform after:tw-duration-600 after:tw-ease-in-expo";
    const beforeHoverClass =
        "group-hover:before:tw-bg-dark-50 group-hover:before:tw-scale-x-0 group-hover:before:tw-transition-transform group-hover:before:tw-duration-600 group-hover:before:tw-ease-in-expo group-hover:before:tw-delay-0";

    const afterHoverClass =
        "group-hover:after:tw-bg-dark-50 group-hover:after:tw-scale-x-[1px] group-hover:after:tw-transition-transform group-hover:after:tw-duration-600 group-hover:after:tw-ease-in-expo group-hover:after:tw-delay-200";

    return (
        <button
            type="button"
            className="tw-w-10 tw-h-10 tw-relative tw-group close-btn"
            onClick={onClose}
        >
            <i
                className={clsx(
                    "icon-top",
                    baseClass,
                    "tw-rotate-45",
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
                    "-tw-rotate-45",
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
