import { SectionHeader } from "./section-helpers";
import type { NonObviousCareer } from "./types";

interface Props {
    matches: NonObviousCareer[];
}

const NonObviousMatches = ({ matches }: Props) => {
    if (matches.length === 0) return null;

    return (
        <section
            id="sec-matches"
            className="tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-20 md:tw-py-24"
        >
            <div className="tw-container tw-flex tw-flex-col tw-gap-10">
                <SectionHeader
                    number="/ 05"
                    eyebrow="Non-Obvious Matches"
                    title="Roles the recruiter won't suggest."
                    lede="Adjacent civilian roles your training maps to that conventional military-to-civilian advice tends to miss."
                />

                <div className="tw-grid tw-grid-cols-1 tw-gap-0 md:tw-grid-cols-2 tw-border-t tw-border-l tw-border-cream/10">
                    {matches.map((m) => (
                        <article
                            key={m.role}
                            className="tw-flex tw-flex-col tw-gap-4 tw-border-b tw-border-r tw-border-cream/10 tw-p-8"
                        >
                            <header className="tw-flex tw-items-baseline tw-justify-between tw-gap-4 tw-border-b tw-border-dashed tw-border-cream/10 tw-pb-4">
                                <h3 className="tw-font-heading tw-text-[22px] tw-font-medium tw-uppercase tw-leading-[1.2] tw-text-cream [letter-spacing:-0.01em]">
                                    {m.role}
                                </h3>
                                <span className="tw-shrink-0 tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#6C757D]">
                                    SOC {m.socCode}
                                </span>
                            </header>
                            <p className="tw-font-body tw-text-[14.5px] tw-leading-[1.6] tw-text-[#DEE2E6]">
                                {m.whyItFits}
                            </p>
                            <span className="tw-mt-auto tw-inline-flex tw-self-start tw-border tw-border-accent tw-px-3 tw-py-1.5 tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.1em] tw-text-accent">
                                Adjacent · Match
                            </span>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NonObviousMatches;
