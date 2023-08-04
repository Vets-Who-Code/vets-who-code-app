import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    mode?: "light" | "dark";
};

const WidgetTitle = ({ children, mode }: TProps) => {
    return (
        <h3
            className={clsx(
                "tw-text-lg tw-mb-[17px]",
                mode === "dark" && "tw-text-white"
            )}
        >
            {children}
        </h3>
    );
};

export default WidgetTitle;
