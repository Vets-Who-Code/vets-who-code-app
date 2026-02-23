import React from "react";
import type { CertEquivalency } from "@/lib/military-translator";

interface CertPathwaysCardProps {
    certPathways: CertEquivalency;
}

const CertPathwaysCard: React.FC<CertPathwaysCardProps> = ({ certPathways }) => {
    const { directQualifies, partialCoverage, recommendedNext } = certPathways;

    if (
        directQualifies.length === 0 &&
        partialCoverage.length === 0 &&
        recommendedNext.length === 0
    ) {
        return null;
    }

    return (
        <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-shadow-sm tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40]">
                <i className="fas fa-certificate tw-mr-2 tw-text-[#c5203e]" />
                Certification Pathways
            </h3>
            <p className="tw-text-sm tw-text-gray-500">
                Based on your MOS training, here are your certification opportunities.
            </p>

            {directQualifies.length > 0 && (
                <div className="tw-space-y-2">
                    <p className="tw-text-xs tw-font-semibold tw-text-green-700 tw-uppercase tw-tracking-wide">
                        Ready to Certify
                    </p>
                    {directQualifies.map((cert) => (
                        <div
                            key={cert}
                            className="tw-flex tw-items-center tw-gap-3 tw-rounded-lg tw-bg-green-50 tw-border tw-border-green-200 tw-px-4 tw-py-3"
                        >
                            <i className="fas fa-check-circle tw-text-green-600" />
                            <div>
                                <p className="tw-text-sm tw-font-medium tw-text-green-800">
                                    {cert}
                                </p>
                                <p className="tw-text-xs tw-text-green-600">
                                    Your training likely qualifies you to sit for this exam now
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {partialCoverage.length > 0 && (
                <div className="tw-space-y-2">
                    <p className="tw-text-xs tw-font-semibold tw-text-blue-700 tw-uppercase tw-tracking-wide">
                        Partial Coverage
                    </p>
                    {partialCoverage.map((item) => (
                        <div
                            key={item.cert}
                            className="tw-rounded-lg tw-bg-blue-50 tw-border tw-border-blue-200 tw-px-4 tw-py-3"
                        >
                            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                                <p className="tw-text-sm tw-font-medium tw-text-blue-800">
                                    {item.cert}
                                </p>
                                <span className="tw-text-xs tw-font-semibold tw-text-blue-600">
                                    ~{item.coverage}% covered
                                </span>
                            </div>
                            <div className="tw-h-2 tw-rounded-full tw-bg-blue-200 tw-overflow-hidden tw-mb-2">
                                <div
                                    className="tw-h-full tw-rounded-full tw-bg-blue-500"
                                    style={{ width: `${item.coverage}%` }}
                                />
                            </div>
                            <p className="tw-text-xs tw-text-blue-600">
                                {item.gaps}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {recommendedNext.length > 0 && (
                <div className="tw-rounded-lg tw-bg-[#091f40]/5 tw-px-4 tw-py-3">
                    <p className="tw-text-xs tw-font-semibold tw-text-[#091f40] tw-uppercase tw-tracking-wide tw-mb-1">
                        Recommended Next Certifications
                    </p>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                        {recommendedNext.map((cert) => (
                            <span
                                key={cert}
                                className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-[#091f40] tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-text-white"
                            >
                                <i className="fas fa-arrow-right tw-text-[10px]" />
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertPathwaysCard;
