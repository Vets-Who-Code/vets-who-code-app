import React from "react";

interface TechnicalSkillsSectionProps {
    systems: Array<{ military: string; civilian: string }>;
}

const TechnicalSkillsSection: React.FC<TechnicalSkillsSectionProps> = ({
    systems,
}) => {
    if (!systems || systems.length === 0) return null;

    return (
        <div>
            <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                <i className="fas fa-microchip tw-mr-2 tw-text-[#c5203e]" />
                Technical Skills Translation
            </h3>
            <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-overflow-hidden">
                <table className="tw-w-full tw-text-sm">
                    <thead>
                        <tr className="tw-bg-[#091f40] tw-text-white">
                            <th className="tw-px-4 tw-py-2.5 tw-text-left tw-font-medium">
                                Military System
                            </th>
                            <th className="tw-px-4 tw-py-2.5 tw-text-left tw-font-medium">
                                Civilian Equivalent
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {systems.map((sys, idx) => (
                            <tr
                                key={sys.military}
                                className={
                                    idx % 2 === 0
                                        ? "tw-bg-white"
                                        : "tw-bg-gray-50"
                                }
                            >
                                <td className="tw-px-4 tw-py-2.5 tw-text-gray-500 tw-font-mono tw-text-xs">
                                    {sys.military}
                                </td>
                                <td className="tw-px-4 tw-py-2.5 tw-text-gray-700 tw-font-medium">
                                    {sys.civilian}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TechnicalSkillsSection;
