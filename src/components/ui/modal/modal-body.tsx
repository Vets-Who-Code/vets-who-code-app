import clsx from "clsx";

type TProps = {
    /**
     * Pass extra classes
     */
    className?: string;
    children: React.ReactNode;
};

const ModalBody = ({ className, children }: TProps) => {
    return (
        <div
            className={clsx(
                className,
                "modal-body tw-relative tw-flex-auto tw-p-4"
            )}
        >
            {children}
        </div>
    );
};

export default ModalBody;
