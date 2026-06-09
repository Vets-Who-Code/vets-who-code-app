import Link from "next/link";
import { SectionHeader } from "./section-helpers";

interface Props {
    code: string;
    skillsYouHave: Array<{ from: string; to: string }>;
    skillsToLearn: Array<{ skill: string; forRole: string }>;
}

const SkillBridgeSection = ({ code, skillsYouHave, skillsToLearn }: Props) => {
    if (skillsYouHave.length === 0 && skillsToLearn.length === 0) return null;

    return (
        <section
            id="sec-skills"
            className="tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-20 md:tw-py-24"
        >
            <div className="tw-container tw-flex tw-flex-col tw-gap-12">
                <SectionHeader
                    number="/ 02"
                    eyebrow="Skill Bridge"
                    title="The gap, named."
                    lede={`What ${code} training already gave you, and the specific gaps to close — not a generic checklist.`}
                />

                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 lg:tw-divide-x lg:tw-divide-cream/10">
                    {/* Already have */}
                    <div className="tw-flex tw-flex-col tw-gap-4 lg:tw-pr-10">
                        <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-cream/10 tw-pb-4">
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                                Already have
                            </span>
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-cream">
                                {String(skillsYouHave.length).padStart(2, "0")}
                            </span>
                        </div>
                        <ul className="tw-flex tw-flex-col">
                            {skillsYouHave.map((s, idx) => (
                                <li
                                    key={`${s.from}-${idx}`}
                                    className="tw-grid tw-grid-cols-[40px_1fr] tw-gap-4 tw-border-b tw-border-cream/10 tw-py-4 last:tw-border-b-0"
                                >
                                    <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <div className="tw-flex tw-flex-col tw-gap-1">
                                        <span className="tw-font-body tw-text-[17px] tw-text-cream">
                                            {s.from}
                                        </span>
                                        <span className="tw-font-body tw-text-[13px] tw-text-[#6C757D]">
                                            → {s.to}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* To learn */}
                    <div className="tw-flex tw-flex-col tw-gap-6 tw-pt-12 lg:tw-pl-10 lg:tw-pt-0">
                        <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-cream/10 tw-pb-4">
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                                To learn
                            </span>
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-cream">
                                {String(skillsToLearn.length).padStart(2, "0")}
                            </span>
                        </div>
                        <p className="tw-font-body tw-text-[15px] tw-leading-[1.55] tw-text-[#DEE2E6]">
                            The concrete gap to bridge — specific to the roles above, not a generic
                            checklist.
                        </p>
                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                            {skillsToLearn.map((s, idx) => (
                                <span
                                    key={`${s.skill}-${idx}`}
                                    className="tw-group tw-flex tw-items-center tw-gap-1.5 tw-border tw-border-cream/[0.18] tw-px-3 tw-py-1.5 tw-font-mono tw-text-[11.5px] tw-uppercase tw-tracking-[0.06em] tw-text-cream tw-transition-colors hover:tw-border-accent"
                                >
                                    <span className="tw-text-accent">+</span>
                                    {s.skill}
                                </span>
                            ))}
                        </div>

                        {/* How VWC fits */}
                        <div className="tw-mt-2 tw-border tw-border-cream/[0.18] tw-bg-secondary tw-p-7">
                            <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-accent">
                                How VWC fits
                            </span>
                            <p className="tw-mt-3 tw-font-body tw-text-[15px] tw-leading-[1.55] tw-text-[#DEE2E6]">
                                Vets Who Code is a free, full-time software engineering accelerator
                                for veterans, active duty, and military spouses. We close the
                                fundamentals — terminal, web platform, AI tooling, portfolio
                                projects — so the rest of this list becomes specialization, not
                                square one.
                            </p>
                            <Link
                                href="/programs/core-curriculum"
                                className="tw-mt-5 tw-inline-flex tw-items-center tw-gap-2 tw-border tw-border-accent tw-px-5 tw-py-3 tw-font-mono tw-text-[11.5px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-accent tw-transition-colors hover:tw-bg-accent hover:tw-text-secondary active:tw-scale-[0.97]"
                            >
                                See VWC Programs →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillBridgeSection;
