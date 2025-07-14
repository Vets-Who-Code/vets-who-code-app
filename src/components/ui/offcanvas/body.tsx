import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    className?: string;
};

const OffcanvasBody = ({ children, className }: TProps) => (
    <div
        className={clsx(
            "tw:h-[calc(100%-80px)] tw:overflow-y-auto tw:px-7.5 tw:pb-[100px] tw:pt-5",
            className
        )}
    >
        {children}
    </div>
);

export default OffcanvasBody;
