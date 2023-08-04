import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    className?: string;
};

const Wrapper = ({ children, className }: TProps) => {
    return (
        <div
            className={clsx(
                "wrapper tw-relative tw-overflow-hidden",
                className
            )}
        >
            <div className="tw-bg-[url('/images/bg/background-pattern-grid-line.png')] tw-bg-[top_center] tw-absolute tw-inset-0 tw-z-20" />
            {children}
        </div>
    );
};

export default Wrapper;
