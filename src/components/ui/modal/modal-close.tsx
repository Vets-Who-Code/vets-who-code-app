import clsx from "clsx";

type TProps = {
    /**
     * Pass extra classes
     */
    className?: string;
    children: React.ReactNode;
    onClose?: () => void;
};

const ModalClose = ({ className, children, onClose }: TProps) => {
    return (
        <button
            type="button"
            className={clsx(
                className,
                "close tw-font-light tw-text-3xl tw-leading-none tw-bg-transparent tw-border-0 tw-appearance-none tw-text-heading tw-cursor-pointer"
            )}
            onClick={onClose}
            data-dismiss="modal"
            aria-label="Close"
        >
            <span aria-hidden="true">{children}</span>
        </button>
    );
};

ModalClose.displayName = "ModalClose";

export default ModalClose;
