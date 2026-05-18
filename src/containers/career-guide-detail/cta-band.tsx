import Link from "next/link";

interface Props {
    code: string;
}

const CtaBand = ({ code }: Props) => (
    <section className="tw-relative tw-overflow-hidden tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-24">
        {/* Grid backdrop */}
        <div
            aria-hidden={true}
            className="tw-pointer-events-none tw-absolute tw-inset-0"
            style={{
                backgroundImage:
                    "linear-gradient(to right, rgba(246,244,239,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(246,244,239,0.10) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                maskImage: "radial-gradient(circle at 30% 50%, black, transparent 75%)",
                WebkitMaskImage: "radial-gradient(circle at 30% 50%, black, transparent 75%)",
            }}
        />

        <div className="tw-relative tw-container tw-flex tw-flex-col tw-gap-7">
            <div className="tw-flex tw-items-center tw-gap-3">
                <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                    / Translator · Live
                </span>
            </div>

            <h2 className="tw-font-heading tw-font-semibold tw-uppercase tw-text-cream [letter-spacing:-0.02em] [line-height:1] [font-size:clamp(32px,4.5vw,56px)]">
                Translate <span className="tw-text-primary">{code}</span> into a resume that ships.
            </h2>

            <p className="tw-max-w-[680px] tw-font-body tw-text-[17px] tw-leading-[1.55] tw-text-[#DEE2E6]">
                Pair this guide with the VWC AI-powered translator: drop in your service record, get
                back ATS-optimized civilian resume language tuned to the tech roles above.
            </p>

            <div className="tw-flex tw-flex-wrap tw-gap-4">
                <Link
                    href="/resume-translator"
                    className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-accent tw-px-7 tw-py-4 tw-font-mono tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-secondary tw-transition-colors hover:tw-bg-gold-bright active:tw-scale-[0.97]"
                >
                    Translate {code} →
                </Link>
                <Link
                    href="/apply"
                    className="tw-inline-flex tw-items-center tw-gap-2 tw-border tw-border-accent tw-px-7 tw-py-4 tw-font-mono tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-accent tw-transition-colors hover:tw-bg-accent hover:tw-text-secondary active:tw-scale-[0.97]"
                >
                    Apply for Cohort 2027
                </Link>
                <Link
                    href="/career-guides"
                    className="tw-inline-flex tw-items-center tw-gap-2 tw-border tw-border-cream/[0.18] tw-px-7 tw-py-4 tw-font-mono tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-cream tw-transition-colors hover:tw-border-cream hover:tw-bg-cream/5 active:tw-scale-[0.97]"
                >
                    Browse all guides
                </Link>
            </div>
        </div>
    </section>
);

export default CtaBand;
