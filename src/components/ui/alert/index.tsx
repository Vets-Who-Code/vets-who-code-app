import clsx from "clsx";

type TProps = {
    className?: string;
    children: React.ReactNode;
    color?: "light" | "warning" | "secondary";
};

const Alert = ({ className, children, color }: TProps) => {
    return (
        <div
            className={clsx(
                "alert tw-py-2.5 tw-pr-3 tw-pl-3 tw-rounded nextIcon:tw-mr-2",
                color === "light" && "tw-bg-gray-200 nextIcon:tw-text-azure",
                color === "warning" && "tw-bg-warning-100 tw-text-heading",
                color === "secondary" && "tw-bg-secondary tw-text-white",
                className
            )}
        >
            {children}
        </div>
    );
};

Alert.defaultProps = {
    color: "light",
};

export default Alert;
