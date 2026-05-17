import type { Branch } from "./types";

interface Props {
    total: number;
    branchCount: number;
    familiesCount: number;
    certsCount: number;
    branches: Branch[];
}

const Cell = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
    <div className="tw-flex tw-flex-col tw-gap-3 tw-px-6 tw-py-7 md:tw-border-l md:tw-border-cream/10 first:md:tw-border-l-0">
        <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#8590a6]">
            {label}
        </span>
        <span className="tw-font-heading tw-text-[30px] tw-font-semibold tw-leading-none tw-text-cream">
            {value}
        </span>
        <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.08em] tw-text-[#8590a6]">
            {sub}
        </span>
    </div>
);

const Hero = ({ total, branchCount, familiesCount, certsCount, branches }: Props) => {
    const branchSub = branches.map((b) => b).join(" · ");

    return (
        <section className="tw-bg-secondary tw-pt-20 md:tw-pt-24">
            <div className="tw-container">
                {/* Breadcrumb */}
                <div className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-[#8590a6]">
                    <span>Home</span>
                    <span className="tw-mx-2 tw-text-[#5a6478]">/</span>
                    <span className="tw-text-cream">Career Guides</span>
                </div>

                {/* Eyebrow */}
                <div className="tw-mt-10 tw-flex tw-items-center tw-gap-3">
                    <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                    <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                        Career Guides{" "}
                        <span className="tw-text-[#5a6478]">/</span> Hashflag Index v1.0
                    </span>
                </div>

                {/* H1 */}
                <h1 className="tw-mt-6 tw-font-heading tw-font-semibold tw-uppercase tw-text-cream [letter-spacing:-0.025em] [line-height:0.98] [font-size:clamp(48px,8.5vw,124px)]">
                    From job code
                    <br />
                    <span className="tw-text-[#8590a6]">to</span>{" "}
                    <span className="tw-text-accent">civilian</span> career.
                </h1>

                {/* Lede */}
                <p className="tw-mt-8 tw-max-w-[720px] tw-font-body tw-text-[#c4cad6] [font-size:clamp(18px,1.6vw,22px)] tw-leading-[1.5]">
                    Every military job code{" "}
                    <span className="tw-font-semibold tw-text-cream">maps to a civilian career</span>{" "}
                    — search {total.toLocaleString()} guides across all five branches, see civilian
                    salary bands sourced from Lightcast labor data, and find the certifications that
                    translate your service into{" "}
                    <span className="tw-font-semibold tw-text-cream">
                        software engineering roles
                    </span>{" "}
                    that pay.
                </p>

                {/* Stat strip */}
                <div className="tw-mt-14 tw-grid tw-grid-cols-2 md:tw-grid-cols-5 tw-border-t tw-border-cream/10">
                    <Cell
                        label="Total Guides"
                        value={total.toLocaleString()}
                        sub="across DoD job codes"
                    />
                    <Cell
                        label="Branches"
                        value={String(branchCount)}
                        sub={branchSub}
                    />
                    <Cell
                        label="Career Families"
                        value={String(familiesCount)}
                        sub="Cyber to Logistics"
                    />
                    <Cell
                        label="Certifications"
                        value={certsCount.toLocaleString()}
                        sub="civilian equivalencies"
                    />
                    <Cell
                        label="Salary Data"
                        value="$45K–$280K"
                        sub="via Lightcast"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
