import { BRANCH_META } from "./branch-meta";
import type { CareerGuideDetail } from "./types";

interface Props {
    detail: CareerGuideDetail;
}

const StatCell = ({
    label,
    value,
    sub,
    accent,
}: {
    label: string;
    value: string;
    sub: string;
    accent?: boolean;
}) => (
    <div className="tw-flex tw-flex-col tw-gap-3 tw-px-6 tw-py-7 md:tw-border-l md:tw-border-cream/10 first:md:tw-border-l-0">
        <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#6C757D]">
            {label}
        </span>
        <span
            className={`tw-font-heading tw-text-[30px] tw-font-semibold tw-leading-none [letter-spacing:-0.02em] ${
                accent ? "tw-text-accent" : "tw-text-cream"
            }`}
        >
            {value}
        </span>
        <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.08em] tw-text-[#6C757D]">
            {sub}
        </span>
    </div>
);

const SummaryRow = ({
    label,
    value,
    big = false,
    mono = false,
}: {
    label: string;
    value: string;
    big?: boolean;
    mono?: boolean;
}) => (
    <div className="tw-flex tw-items-baseline tw-justify-between tw-gap-4 tw-border-b tw-border-dashed tw-border-cream/10 tw-py-3 last:tw-border-b-0">
        <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#6C757D]">
            {label}
        </span>
        <span
            className={
                big
                    ? "tw-font-heading tw-text-[22px] tw-font-semibold tw-text-cream [letter-spacing:-0.02em]"
                    : mono
                      ? "tw-font-mono tw-text-[13px] tw-text-cream"
                      : "tw-font-body tw-text-[15px] tw-text-cream"
            }
        >
            {value}
        </span>
    </div>
);

const Hero = ({ detail }: Props) => {
    const meta = BRANCH_META[detail.branch];
    const titleWords = detail.training.title.trim().split(/\s+/);
    const lastWord = titleWords.pop() ?? detail.training.title;
    const leadWords = titleWords.join(" ");

    return (
        <section id="sec-overview" className="tw-bg-secondary tw-pt-16 md:tw-pt-20">
            <div className="tw-container">
                {/* Breadcrumb */}
                <div className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                    <span>Home</span>
                    <span className="tw-mx-2 tw-text-[#495057]">/</span>
                    <span>Career Guides</span>
                    <span className="tw-mx-2 tw-text-[#495057]">/</span>
                    <span className="tw-text-cream">{detail.code}</span>
                </div>

                {/* Eyebrow row */}
                <div className="tw-mt-10 tw-flex tw-flex-wrap tw-items-center tw-gap-3">
                    <span className="tw-inline-flex tw-items-center tw-gap-2 tw-border tw-border-accent tw-px-3 tw-py-1.5 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.12em] tw-text-cream">
                        <span
                            aria-hidden={true}
                            className="tw-h-2 tw-w-2"
                            style={{ backgroundColor: meta.color }}
                        />
                        {meta.short} · {detail.code}
                    </span>
                    <span className="tw-flex tw-items-center tw-gap-3">
                        <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                        <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                            Career Guide · {detail.family} · {detail.summary.docId}
                        </span>
                    </span>
                </div>

                {/* Two-col grid */}
                <div className="tw-mt-12 tw-grid tw-grid-cols-1 tw-gap-14 lg:tw-grid-cols-[1.5fr_1fr]">
                    {/* Left — display title + lede */}
                    <div className="tw-flex tw-flex-col tw-gap-6">
                        <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#495057]">
                            {detail.code} · {meta.short} · {detail.rank}
                        </span>
                        <h1 className="tw-font-heading tw-font-semibold tw-uppercase tw-text-cream [letter-spacing:-0.025em] [line-height:0.98] [font-size:clamp(48px,8.5vw,116px)]">
                            {leadWords && (
                                <>
                                    {leadWords}
                                    <br />
                                </>
                            )}
                            <span className="tw-text-accent">{lastWord}.</span>
                        </h1>
                        <p className="tw-max-w-[640px] tw-font-body tw-text-[#DEE2E6] [font-size:clamp(17px,1.4vw,20px)] tw-leading-[1.55]">
                            <span className="tw-font-semibold tw-text-cream">
                                {detail.training.branch} {detail.code} ({detail.training.title}).
                            </span>{" "}
                            {detail.training.hours.toLocaleString()} hours of formal training
                            translate to{" "}
                            <span className="tw-font-semibold tw-text-cream">
                                {detail.pathways.length} validated civilian career pathways
                            </span>{" "}
                            with salary bands of {detail.summary.salaryBand}. Sourced from DoD
                            training data and Lightcast labor signals.
                        </p>
                    </div>

                    {/* Right — summary card */}
                    <aside className="tw-border tw-border-cream/[0.18] tw-bg-[#003559]">
                        <header className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-cream/10 tw-px-5 tw-py-4">
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#6C757D]">
                                Summary · Lightcast
                            </span>
                            <span className="tw-relative tw-flex tw-h-[7px] tw-w-[7px]">
                                <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-accent tw-opacity-75" />
                                <span className="tw-relative tw-inline-flex tw-h-[7px] tw-w-[7px] tw-rounded-full tw-bg-accent tw-shadow-[0_0_8px_#FDB330]" />
                            </span>
                        </header>
                        <div className="tw-flex tw-flex-col tw-px-5">
                            <SummaryRow
                                label="Top civilian match"
                                value={detail.summary.topMatch}
                            />
                            <SummaryRow
                                label="Civilian salary band"
                                value={detail.summary.salaryBand}
                                big={true}
                            />
                            <SummaryRow label="Market demand" value={detail.summary.demand} />
                            <SummaryRow
                                label="Tech match score"
                                value={detail.summary.techMatchScore}
                            />
                            <SummaryRow label="Doc ID" value={detail.summary.docId} mono={true} />
                        </div>
                    </aside>
                </div>

                {/* Stat strip */}
                <div className="tw-mt-14 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-5 tw-border-t tw-border-b tw-border-cream/10">
                    <StatCell
                        label="Training hours"
                        value={detail.stats.trainingHours.toLocaleString()}
                        sub="DoD pipeline"
                    />
                    <StatCell
                        label="ACE credit"
                        value={detail.stats.aceCredit !== "—" ? "ACE" : "—"}
                        sub={
                            detail.stats.aceCredit !== "—"
                                ? detail.stats.aceCredit
                                : "no recommendation"
                        }
                    />
                    <StatCell
                        label="Tech roles"
                        value={String(detail.stats.techRolesMapped)}
                        sub="mapped to your code"
                        accent={true}
                    />
                    <StatCell
                        label="Civilian pathways"
                        value={String(detail.stats.civilianPathways)}
                        sub="validated"
                    />
                    <StatCell
                        label="Cert coverage"
                        value={detail.stats.certCoverage}
                        sub="direct + partial"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
