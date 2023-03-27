import clsx from "clsx";

type TProps = {
    /**
     * Pass extra classes
     */
    className?: string;
    children: React.ReactNode;
};

const ModalHeader = ({ className, children }: TProps) => {
    return (
        <div
            className={clsx(
                className,
                "modal-header tw-flex tw-items-center tw-justify-between tw-p-4 tw-border-b tw-border-b-gray-400/30 tw-rounded-tl tw-rounded-tr"
            )}
        >
            {children}
        </div>
    );
};

export default ModalHeader;
