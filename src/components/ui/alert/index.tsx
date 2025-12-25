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
                "alert tw-rounded tw-py-2.5 tw-pl-3 tw-pr-3 nextIcon:tw-mr-2",
                color === "light" && "tw-bg-gray-50 nextIcon:tw-text-navy-ocean",
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
