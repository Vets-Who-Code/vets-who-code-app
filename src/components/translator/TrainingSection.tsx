import React from "react";
import type { TrainingEntry } from "@/lib/military-translator";

interface TrainingSectionProps {
    training: TrainingEntry;
    leadershipCourses?: string[];
}

const TrainingSection: React.FC<TrainingSectionProps> = ({
    training,
    leadershipCourses,
}) => {
    return (
        <div className="tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                <i className="fas fa-graduation-cap tw-mr-2 tw-text-[#c5203e]" />
                Training &amp; Education
            </h3>

            <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-gray-50 tw-p-5 tw-space-y-3">
                <div>
                    <p className="tw-text-sm tw-font-semibold tw-text-[#091f40]">
                        {training.program}
                    </p>
                    <p className="tw-text-sm tw-text-gray-600 tw-mt-1">
                        {training.hours.toLocaleString()} hours of formal training
                        {training.weeks ? ` (${training.weeks} weeks)` : ""}
                    </p>
                </div>

                {training.topics.length > 0 && (
                    <div>
                        <p className="tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wide tw-mb-1">
                            Core Training Areas
                        </p>
                        <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                            {training.topics.map((topic) => (
                                <span
                                    key={topic}
                                    className="tw-inline-block tw-rounded-full tw-bg-[#091f40]/10 tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-text-[#091f40]"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {training.civilianCerts.length > 0 && (
                    <div>
                        <p className="tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wide tw-mb-1">
                            Civilian Certification Equivalencies
                        </p>
                        <ul className="tw-space-y-1">
                            {training.civilianCerts.map((cert) => (
                                <li
                                    key={cert}
                                    className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-700"
                                >
                                    <i className="fas fa-check tw-text-green-500 tw-text-xs" />
                                    {cert}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {training.aceCredits && (
                    <p className="tw-text-sm tw-text-gray-600 tw-italic">
                        <i className="fas fa-university tw-mr-1 tw-text-gray-400" />
                        ACE Credit Recommendation: {training.aceCredits}
                    </p>
                )}
            </div>

            {leadershipCourses && leadershipCourses.length > 0 && (
                <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-gray-50 tw-p-5">
                    <p className="tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wide tw-mb-2">
                        Leadership &amp; Professional Development
                    </p>
                    <ul className="tw-space-y-1">
                        {leadershipCourses.map((course) => (
                            <li
                                key={course}
                                className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-700"
                            >
                                <i className="fas fa-award tw-text-[#c5203e] tw-text-xs" />
                                {course}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TrainingSection;
