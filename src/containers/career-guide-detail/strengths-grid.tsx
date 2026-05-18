import { SectionHeader } from "./section-helpers";
import type { CognitiveSkill } from "./types";

interface Props {
    code: string;
    skills: CognitiveSkill[];
}

const StrengthsGrid = ({ code, skills }: Props) => {
    if (skills.length === 0) return null;

    return (
        <section
            id="sec-strengths"
            className="tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-20 md:tw-py-24"
        >
            <div className="tw-container tw-flex tw-flex-col tw-gap-10">
                <SectionHeader
                    number="/ 04"
                    eyebrow="Hidden Strengths"
                    title="What the code built."
                    lede={`Cognitive skills your ${code} training built — and where they transfer in civilian work.`}
                />

                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-5 tw-border-t tw-border-l tw-border-cream/10">
                    {skills.map((s, idx) => (
                        <article
                            key={s.skill}
                            className="tw-flex tw-flex-col tw-gap-4 tw-border-b tw-border-r tw-border-cream/10 tw-p-6 tw-min-h-[290px]"
                        >
                            <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-accent">
                                S.{String(idx + 1).padStart(2, "0")}
                            </span>
                            <h3 className="tw-font-heading tw-text-[21px] tw-font-medium tw-uppercase tw-leading-[1.2] tw-text-cream [letter-spacing:-0.01em]">
                                {s.skill}
                            </h3>
                            <p className="tw-font-body tw-text-[13px] tw-leading-[1.55] tw-text-[#c4cad6]">
                                {s.militaryContext}
                            </p>
                            <div className="tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-border-t tw-border-dashed tw-border-cream/10 tw-pt-3">
                                <span className="tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                                    Transfers to
                                </span>
                                <p className="tw-font-body tw-text-[12px] tw-leading-[1.5] tw-text-[#c4cad6]">
                                    {s.civilianTranslation}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StrengthsGrid;
