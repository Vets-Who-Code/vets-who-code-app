import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    className?: string;
};

const OffcanvasBody = ({ children, className }: TProps) => (
    <div
        className={clsx(
            "tw-overflow-y-auto tw-h-[calc(100%_-_80px)] tw-pt-5 tw-pb-[100px] tw-px-7.5",
            className
        )}
    >
        {children}
    </div>
);

export default OffcanvasBody;
