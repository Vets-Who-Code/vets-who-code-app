import Link from "next/link";

const WorkBelt = () => {
    return (
        <section
            className="dark-section tw-bg-navy tw-border-t tw-border-[rgba(185,214,242,0.08)] tw-py-10 md:tw-py-14"
            aria-label="Veteran-built work"
        >
            <div className="tw-container tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-3 sm:tw-flex-row sm:tw-items-center">
                <p
                    className="tw-m-0 tw-text-white"
                    style={{
                        fontFamily: "var(--font-headline)",
                        fontWeight: 700,
                        fontSize: "clamp(18px, 2vw, 22px)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                    }}
                >
                    First commit to production. Built by veterans.
                </p>
                <Link
                    href="/projects"
                    className="tw-group tw-inline-flex tw-items-center tw-gap-2 tw-whitespace-nowrap tw-text-gold hover:tw-text-gold-light"
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                    }}
                >
                    <span>See the work</span>
                    <span
                        className="tw-inline-block tw-transition-transform group-hover:tw-translate-x-1"
                        aria-hidden="true"
                    >
                        →
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default WorkBelt;
