import React from "react";
import type { CareerPathway } from "@/lib/military-translator";

interface CareerPathwaysCardProps {
    careerPathways: CareerPathway[];
}

const DEMAND_COLORS: Record<string, string> = {
    "Very high demand": "tw-text-green-700 tw-bg-green-50",
    "High demand": "tw-text-green-600 tw-bg-green-50",
    "Growing demand": "tw-text-blue-600 tw-bg-blue-50",
    "Stable demand": "tw-text-gray-600 tw-bg-gray-100",
};

const MATCH_COLORS: Record<string, string> = {
    "High match": "tw-text-green-700",
    "Good match": "tw-text-blue-700",
    "Moderate match": "tw-text-gray-600",
};

const DATA_SOURCE_LABELS: Record<string, string> = {
    lightcast: "Salary data powered by Lightcast",
    census_acs: "Source: US Census Bureau ACS",
    curated: "Salary estimates from VWC career data",
};

function formatSalaryCompact(salary: number): string {
    return `$${Math.round(salary / 1000)}K`;
}

const CareerPathwaysCard: React.FC<CareerPathwaysCardProps> = ({
    careerPathways,
}) => {
    if (!careerPathways || careerPathways.length === 0) return null;

    const allSkillGaps = [
        ...new Set(
            careerPathways.flatMap((p) => p.skillsToClose || [])
        ),
    ].slice(0, 5);

    // Collect trending skills from live data
    const trendingSkills = [
        ...new Set(
            careerPathways.flatMap((p) => p.topSkillsInDemand || [])
        ),
    ].slice(0, 5);

    // Determine the primary data source from the first pathway
    const primaryDataSource = careerPathways[0]?.dataSource || "curated";

    return (
        <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-shadow-sm tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40]">
                <i className="fas fa-route tw-mr-2 tw-text-[#c5203e]" />
                Career Pathways
            </h3>
            <p className="tw-text-sm tw-text-gray-500">
                Your military experience maps to these civilian roles.
            </p>

            <div className="tw-space-y-3">
                {careerPathways.map((pathway) => (
                    <div
                        key={pathway.role}
                        className="tw-flex tw-items-center tw-justify-between tw-rounded-lg tw-border tw-border-gray-100 tw-bg-gray-50 tw-px-4 tw-py-3"
                    >
                        <div className="tw-flex tw-items-center tw-gap-3">
                            <i className="fas fa-arrow-right tw-text-[#091f40] tw-text-sm" />
                            <div>
                                <p className="tw-text-sm tw-font-medium tw-text-[#091f40]">
                                    {pathway.role}
                                </p>
                                <p
                                    className={`tw-text-xs tw-font-medium ${
                                        MATCH_COLORS[pathway.matchLevel] || "tw-text-gray-500"
                                    }`}
                                >
                                    {pathway.matchLevel}
                                </p>
                            </div>
                        </div>
                        <div className="tw-text-right">
                            <p className="tw-text-sm tw-font-semibold tw-text-[#091f40]">
                                ${pathway.avgSalary.toLocaleString()}
                            </p>
                            {pathway.salaryRange && (
                                <p className="tw-text-[10px] tw-text-gray-500">
                                    {formatSalaryCompact(pathway.salaryRange.p25)}&ndash;{formatSalaryCompact(pathway.salaryRange.p75)} range
                                </p>
                            )}
                            <span
                                className={`tw-inline-block tw-rounded-full tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-semibold ${
                                    DEMAND_COLORS[pathway.demand] || "tw-text-gray-500 tw-bg-gray-100"
                                }`}
                            >
                                {pathway.demand}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {trendingSkills.length > 0 && (
                <div className="tw-rounded-lg tw-bg-green-50 tw-px-4 tw-py-3">
                    <p className="tw-text-xs tw-font-semibold tw-text-green-800 tw-uppercase tw-tracking-wide tw-mb-2">
                        <i className="fas fa-chart-line tw-mr-1" />
                        Skills in Demand
                    </p>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                        {trendingSkills.map((skill) => (
                            <span
                                key={skill}
                                className="tw-inline-block tw-rounded-full tw-border tw-border-green-200 tw-bg-white tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-text-green-800"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {allSkillGaps.length > 0 && (
                <div className="tw-rounded-lg tw-bg-[#091f40]/5 tw-px-4 tw-py-3">
                    <p className="tw-text-xs tw-font-semibold tw-text-[#091f40] tw-uppercase tw-tracking-wide tw-mb-2">
                        Top Skills to Develop for Highest-Value Path
                    </p>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                        {allSkillGaps.map((skill) => (
                            <span
                                key={skill}
                                className="tw-inline-block tw-rounded-full tw-border tw-border-[#091f40]/20 tw-bg-white tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-text-[#091f40]"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Data source attribution */}
            <p className="tw-text-[10px] tw-text-gray-400 tw-text-right tw-pt-1">
                {DATA_SOURCE_LABELS[primaryDataSource] || DATA_SOURCE_LABELS.curated}
            </p>
        </div>
    );
};

export default CareerPathwaysCard;
