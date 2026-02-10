import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    className?: string;
    color?: string;
};

const Wrapper = ({ children, className, color }: TProps) => {
    return (
        <div
            className={clsx("wrapper", className, color)}
            style={{
                backgroundImage: `url("/images/bg/background-pattern-grid-line.png")`,
            }}
        >
            {children}
        </div>
    );
};

Wrapper.defaultProps = {
    color: "tw-bg-gray-50",
};

export default Wrapper;
