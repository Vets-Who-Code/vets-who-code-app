import clsx from "clsx";

type TProps = {
    title: string;
    className?: string;
};

const Testimonial04 = ({ title, className }: TProps) => {
    return (
        <div
            className={clsx(
                "tw-max-w-[270px] tw-px-[26px] tw-py-7.5 tw-shadow-lg tw-shadow-heading/10",
                className
            )}
            style={{
                background: "var(--red, #c5203e)",
                borderRadius: 0,
            }}
        >
            <h3
                className="tw-text-xl"
                style={{ color: "#FFFFFF" }}
            >
                <span style={{ color: "var(--navy, #091f40)", fontWeight: 900 }}>&ldquo;</span>
                {title}
                <span style={{ color: "var(--navy, #091f40)", fontWeight: 900 }}>&rdquo;</span>
            </h3>
        </div>
    );
};

export default Testimonial04;
