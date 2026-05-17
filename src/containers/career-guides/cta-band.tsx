import Link from "next/link";

const CtaBand = () => (
    <section className="tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-20 md:tw-py-24">
        <div className="tw-container">
            <div className="tw-mb-6 tw-flex tw-items-center tw-gap-3">
                <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                    Cohort 2027 · Intake Open
                </span>
            </div>

            <h2 className="tw-font-heading tw-font-semibold tw-uppercase tw-text-cream [letter-spacing:-0.02em] [line-height:1] [font-size:clamp(32px,4.5vw,56px)]">
                Found your translation?
                <br />
                <span className="tw-text-[#8590a6]">
                    Now build the skills to land it.
                </span>
            </h2>

            <p className="tw-mt-7 tw-max-w-[680px] tw-font-body tw-text-[17px] tw-leading-[1.55] tw-text-[#c4cad6]">
                Vets Who Code is a free, full-time software engineering accelerator for active duty,
                veterans, and military spouses. 17 weeks, 25 modules, and a portfolio that ships.
            </p>

            <div className="tw-mt-9 tw-flex tw-flex-wrap tw-gap-4">
                <Link
                    href="/apply"
                    className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-accent tw-px-7 tw-py-4 tw-font-mono tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-secondary tw-transition-colors hover:tw-bg-gold-bright active:tw-scale-[0.97]"
                >
                    Apply for Cohort 2027 →
                </Link>
                <Link
                    href="/programs/core-curriculum"
                    className="tw-inline-flex tw-items-center tw-gap-2 tw-border tw-border-cream/[0.18] tw-px-7 tw-py-4 tw-font-mono tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-cream tw-transition-colors hover:tw-border-cream hover:tw-bg-cream/5 active:tw-scale-[0.97]"
                >
                    Read the curriculum
                </Link>
            </div>
        </div>
    </section>
);

export default CtaBand;
