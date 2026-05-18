import CertBar from "./cert-bar";
import { SectionHeader } from "./section-helpers";
import type { CertData, TrainingData } from "./types";

interface Props {
    training: TrainingData;
    certs: CertData;
}

const TrainingSection = ({ training, certs }: Props) => (
    <section
        id="sec-training"
        className="tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-20 md:tw-py-24"
    >
        <div className="tw-container tw-flex tw-flex-col tw-gap-10">
            <SectionHeader
                number="/ 06"
                eyebrow="Training & Certs"
                title="What you trained on."
                meta="SOURCE · DOD + ACE\nVALIDATED"
            />

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[1fr_1.1fr_1.4fr] lg:tw-divide-x lg:tw-divide-cream/10">
                {/* Academy */}
                <div className="tw-flex tw-flex-col tw-gap-4 lg:tw-pr-8">
                    <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                        Academy
                    </span>
                    <h3 className="tw-font-heading tw-text-[26px] tw-font-medium tw-uppercase tw-leading-[1.15] tw-text-cream [letter-spacing:-0.01em]">
                        {training.program.split(",")[0]}
                    </h3>
                    {training.program.includes(",") && (
                        <span className="tw-font-mono tw-text-[11.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                            {training.program.split(",").slice(1).join(",").trim()}
                        </span>
                    )}
                    <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-border-t tw-border-dashed tw-border-cream/10 tw-pt-4">
                        <div className="tw-flex tw-flex-col tw-gap-1">
                            <span className="tw-font-heading tw-text-[22px] tw-font-semibold tw-text-cream [letter-spacing:-0.02em]">
                                {training.hours.toLocaleString()}h
                            </span>
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                Hours
                            </span>
                        </div>
                        {training.weeks && (
                            <div className="tw-flex tw-flex-col tw-gap-1">
                                <span className="tw-font-heading tw-text-[22px] tw-font-semibold tw-text-cream [letter-spacing:-0.02em]">
                                    {training.weeks}wk
                                </span>
                                <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                    Weeks
                                </span>
                            </div>
                        )}
                        {training.ace_credits && (
                            <div className="tw-flex tw-flex-col tw-gap-1">
                                <span className="tw-font-heading tw-text-[22px] tw-font-semibold tw-text-accent [letter-spacing:-0.02em]">
                                    ACE
                                </span>
                                <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                    Credit
                                </span>
                            </div>
                        )}
                    </div>
                    {training.ace_credits && (
                        <p className="tw-font-body tw-text-[13px] tw-leading-[1.55] tw-text-[#6C757D]">
                            {training.ace_credits}
                        </p>
                    )}
                </div>

                {/* Topics */}
                <div className="tw-flex tw-flex-col tw-gap-4 tw-pt-10 lg:tw-px-8 lg:tw-pt-0">
                    <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                        Topics · {training.topics.length}
                    </span>
                    <ul className="tw-flex tw-flex-col">
                        {training.topics.map((topic) => (
                            <li
                                key={topic}
                                className="tw-flex tw-items-center tw-gap-3 tw-border-b tw-border-cream/10 tw-py-3 last:tw-border-b-0"
                            >
                                <span aria-hidden={true} className="tw-text-accent">
                                    ▸
                                </span>
                                <span className="tw-font-body tw-text-[14.5px] tw-text-cream">
                                    {topic}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Certs */}
                <div className="tw-flex tw-flex-col tw-gap-6 tw-pt-10 lg:tw-pl-8 lg:tw-pt-0">
                    {certs.partial_coverage.length > 0 && (
                        <>
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                                Partial coverage · {certs.partial_coverage.length}
                            </span>
                            <ul className="tw-flex tw-flex-col tw-gap-5">
                                {certs.partial_coverage.slice(0, 3).map((c) => (
                                    <li key={c.cert} className="tw-flex tw-flex-col tw-gap-2">
                                        <div className="tw-flex tw-items-baseline tw-justify-between tw-gap-4">
                                            <span className="tw-font-body tw-text-[17px] tw-text-cream">
                                                {c.cert}
                                            </span>
                                            <span className="tw-font-heading tw-text-[20px] tw-font-semibold tw-text-accent [letter-spacing:-0.02em] tw-tabular-nums">
                                                {c.coverage}%
                                            </span>
                                        </div>
                                        <CertBar fill={c.coverage} />
                                        <p className="tw-font-body tw-text-[12.5px] tw-leading-[1.5] tw-text-[#6C757D]">
                                            {c.gaps}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {certs.recommended_next.length > 0 && (
                        <div className="tw-mt-2 tw-flex tw-flex-col tw-gap-3 tw-border-t tw-border-dashed tw-border-cream/10 tw-pt-4">
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                                Recommended next ·{" "}
                                {String(certs.recommended_next.length).padStart(2, "0")}
                            </span>
                            <ul className="tw-flex tw-flex-col tw-gap-2">
                                {certs.recommended_next.slice(0, 6).map((c) => (
                                    <li
                                        key={c}
                                        className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-cream/10 tw-py-2 last:tw-border-b-0"
                                    >
                                        <span className="tw-font-body tw-text-[14px] tw-text-cream">
                                            {c}
                                        </span>
                                        <span className="tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                            Adjacent
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
);

export default TrainingSection;
