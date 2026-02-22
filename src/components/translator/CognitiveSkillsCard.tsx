import React from "react";
import type { CognitiveProfile } from "@/lib/military-translator";

interface CognitiveSkillsCardProps {
    cognitiveProfile: CognitiveProfile;
}

const CognitiveSkillsCard: React.FC<CognitiveSkillsCardProps> = ({
    cognitiveProfile,
}) => {
    const { cognitiveSkills, nonObviousCareers } = cognitiveProfile;

    if (cognitiveSkills.length === 0 && nonObviousCareers.length === 0) {
        return null;
    }

    return (
        <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-shadow-sm tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40]">
                <i className="fas fa-brain tw-mr-2 tw-text-[#c5203e]" />
                Hidden Strengths
            </h3>
            <p className="tw-text-sm tw-text-gray-500">
                Cognitive skills your military training built — and where they transfer.
            </p>

            {/* Cognitive Skills */}
            <div className="tw-space-y-3">
                {cognitiveSkills.map((cs) => (
                    <div
                        key={cs.skill}
                        className="tw-rounded-lg tw-border tw-border-gray-100 tw-bg-gray-50 tw-px-4 tw-py-3"
                    >
                        <p className="tw-text-sm tw-font-medium tw-text-[#091f40]">
                            {cs.skill}
                        </p>
                        <p className="tw-text-xs tw-text-gray-500 tw-italic tw-mt-1">
                            {cs.militaryContext}
                        </p>
                        <p className="tw-text-xs tw-text-gray-700 tw-mt-1">
                            {cs.civilianTranslation}
                        </p>
                    </div>
                ))}
            </div>

            {/* Non-Obvious Careers */}
            {nonObviousCareers.length > 0 && (
                <div>
                    <p className="tw-text-xs tw-font-semibold tw-text-[#091f40] tw-uppercase tw-tracking-wide tw-mb-2">
                        <i className="fas fa-lightbulb tw-mr-1 tw-text-[#c5a44e]" />
                        Careers You Might Not Have Considered
                    </p>
                    <div className="tw-space-y-3">
                        {nonObviousCareers.map((career) => (
                            <div
                                key={career.role}
                                className="tw-rounded-lg tw-border tw-border-gray-100 tw-bg-gray-50 tw-px-4 tw-py-3"
                            >
                                <div className="tw-flex tw-items-center tw-justify-between tw-mb-1">
                                    <p className="tw-text-sm tw-font-medium tw-text-[#091f40]">
                                        {career.role}
                                    </p>
                                    <span className="tw-text-[10px] tw-bg-gray-200 tw-text-gray-500 tw-px-2 tw-py-0.5 tw-rounded tw-font-mono">
                                        SOC {career.socCode}
                                    </span>
                                </div>
                                <p className="tw-text-xs tw-text-gray-700">
                                    {career.whyItFits}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CognitiveSkillsCard;
