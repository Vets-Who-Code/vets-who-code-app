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
                "close tw:cursor-pointer tw:appearance-none tw:border-0 tw:bg-transparent tw:text-3xl tw:font-light tw:leading-none tw:text-heading"
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
