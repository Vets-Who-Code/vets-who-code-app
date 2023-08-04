import clsx from "clsx";
import CloseButton from "../close-button";

type TProps = {
    className?: string;
    onClose: () => void;
    children: React.ReactNode;
};

const OffcanvasHeader = ({ children, onClose, className }: TProps) => (
    <div
        className={clsx(
            "tw-flex tw-items-center tw-justify-between tw-h-20 tw-pl-7.5 tw-pr-3.8 tw-bg-white",
            className
        )}
    >
        {children}
        <CloseButton onClose={onClose} />
    </div>
);

export default OffcanvasHeader;
