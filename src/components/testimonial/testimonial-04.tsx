import clsx from "clsx";

type TProps = {
    title: string;
    className?: string;
};

const Testimonial04 = ({ title, className }: TProps) => {
    return (
        <div
            className={clsx("tw-max-w-[270px] tw-relative", className)}
            style={{
                background: "transparent",
                borderLeft: "2px solid var(--red, #c5203e)",
                paddingLeft: "24px",
                paddingTop: "24px",
                paddingRight: "24px",
                paddingBottom: "24px",
                borderRadius: 0,
            }}
        >
            <div
                aria-hidden="true"
                style={{
                    fontFamily: "var(--font-headline)",
                    fontWeight: 900,
                    fontSize: "64px",
                    color: "#FFFFFF",
                    lineHeight: 1,
                    opacity: 0.08,
                    position: "absolute",
                    top: "-16px",
                    left: "16px",
                    pointerEvents: "none",
                }}
            >
                &ldquo;
            </div>
            <p
                style={{
                    fontFamily: "var(--font-body, Gilroy, sans-serif)",
                    fontSize: "clamp(16px, 2vw, 20px)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    lineHeight: 1.74,
                    margin: 0,
                    position: "relative",
                }}
            >
                {title}
            </p>
        </div>
    );
};

export default Testimonial04;
