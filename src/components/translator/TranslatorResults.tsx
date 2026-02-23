import Button from "@ui/button";
import {
    formatForResume,
    getSuggestions,
    type TranslatedProfile,
} from "@/lib/military-translator";
import { trackTranslatorEvent } from "@/lib/translator-analytics";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TrainingSection from "./TrainingSection";
import TechnicalSkillsSection from "./TechnicalSkillsSection";
import CertPathwaysCard from "./CertPathwaysCard";
import CareerPathwaysCard from "./CareerPathwaysCard";
import CognitiveSkillsCard from "./CognitiveSkillsCard";

interface TranslatorResultsProps {
    result: TranslatedProfile;
    resultSource: "dictionary" | "ai";
    isTranslating: boolean;
    onReset: () => void;
    targetJobTitle?: string;
    leadershipCourses?: string[];
}

const TranslatorResults: React.FC<TranslatorResultsProps> = ({
    result,
    resultSource,
    isTranslating,
    onReset,
    targetJobTitle,
    leadershipCourses,
}) => {
    const [editableResult, setEditableResult] = useState<TranslatedProfile>(result);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [linkedInCopied, setLinkedInCopied] = useState(false);

    useEffect(() => {
        setEditableResult(result);
    }, [result]);

    const suggestions = useMemo(() => {
        if (editableResult.suggestions && editableResult.suggestions.length > 0) {
            return editableResult.suggestions;
        }
        return [
            ...new Set(
                editableResult.keyResponsibilities.flatMap((r) => getSuggestions(r))
            ),
        ];
    }, [editableResult]);

    const handleSummaryBlur = useCallback((e: React.FocusEvent<HTMLParagraphElement>) => {
        const newText = e.currentTarget.textContent || "";
        setEditableResult((prev) => ({ ...prev, summary: newText }));
    }, []);

    const handleBulletBlur = useCallback(
        (field: "keyResponsibilities" | "achievements", index: number) =>
            (e: React.FocusEvent<HTMLSpanElement>) => {
                const newText = e.currentTarget.textContent || "";
                setEditableResult((prev) => {
                    const updated = [...prev[field]];
                    updated[index] = newText;
                    return { ...prev, [field]: updated };
                });
            },
        []
    );

    const handleDeleteBullet = useCallback(
        (field: "keyResponsibilities" | "achievements", index: number) => () => {
            setEditableResult((prev) => ({
                ...prev,
                [field]: prev[field].filter((_, i) => i !== index),
            }));
        },
        []
    );

    const handleDownloadTxt = useCallback(() => {
        trackTranslatorEvent({ action: "export_txt" });
        const resumeText = formatForResume(editableResult);
        const blob = new Blob([resumeText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "civilian-resume.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [editableResult]);

    const handleDownloadPdf = useCallback(async () => {
        trackTranslatorEvent({ action: "export_pdf" });
        setGeneratingPdf(true);
        try {
            const { generateResumePDF } = await import("@/lib/pdf-resume");
            const pdfBytes = await generateResumePDF(editableResult, targetJobTitle);
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "civilian-resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("PDF generation failed:", err);
        } finally {
            setGeneratingPdf(false);
        }
    }, [editableResult, targetJobTitle]);

    const handleCopyLinkedIn = useCallback(async () => {
        trackTranslatorEvent({ action: "copy_linkedin" });
        const lines = [
            editableResult.summary,
            "",
            "Key Expertise:",
            ...editableResult.keyResponsibilities.slice(0, 5).map((r) => `• ${r}`),
        ];
        if (editableResult.achievements.length > 0) {
            lines.push("", "Notable Achievements:");
            lines.push(
                ...editableResult.achievements.slice(0, 3).map((a) => `• ${a}`)
            );
        }
        const text = lines.join("\n");
        try {
            await navigator.clipboard.writeText(text);
            setLinkedInCopied(true);
            setTimeout(() => setLinkedInCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setLinkedInCopied(true);
            setTimeout(() => setLinkedInCopied(false), 2000);
        }
    }, [editableResult]);

    const renderBulletList = (
        items: string[],
        field: "keyResponsibilities" | "achievements"
    ) => {
        const fieldLabel = field === "keyResponsibilities" ? "responsibility" : "achievement";
        return (
            <ul className="tw-space-y-2" role="list">
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="tw-group tw-flex tw-items-start tw-text-gray-700 focus-within:tw-bg-gray-50"
                    >
                        <span className="tw-text-[#c5203e] tw-mr-3 tw-mt-1" aria-hidden="true">
                            &bull;
                        </span>
                        <span
                            role="textbox"
                            aria-label={`Edit ${fieldLabel} ${idx + 1}`}
                            tabIndex={isTranslating ? undefined : 0}
                            contentEditable={!isTranslating}
                            suppressContentEditableWarning
                            onBlur={handleBulletBlur(field, idx)}
                            className="tw-flex-1 tw-outline-none tw-rounded tw-px-1 hover:tw-bg-gray-50 focus:tw-bg-blue-50 focus:tw-ring-1 focus:tw-ring-blue-300"
                        >
                            {item}
                        </span>
                        {!isTranslating && (
                            <button
                                type="button"
                                onClick={handleDeleteBullet(field, idx)}
                                className="tw-ml-2 tw-mt-0.5 tw-opacity-0 group-hover:tw-opacity-100 focus:tw-opacity-100 tw-text-gray-300 hover:tw-text-red-500 focus:tw-text-red-500 tw-transition-opacity tw-text-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-red-300 tw-rounded"
                                title="Remove bullet"
                                aria-label={`Remove ${fieldLabel} ${idx + 1}: ${item.slice(0, 50)}`}
                            >
                                <i className="fas fa-times" />
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="tw-space-y-6">
            {/* Source indicator */}
            {resultSource === "dictionary" && (
                <div
                    className="tw-flex tw-items-center tw-gap-3 tw-rounded-lg tw-border tw-border-blue-200 tw-bg-blue-50 tw-px-4 tw-py-3"
                    role="status"
                    aria-live="polite"
                >
                    <i className="fas fa-spinner fa-spin tw-text-blue-600" />
                    <p className="tw-text-sm tw-text-blue-700">
                        Showing instant dictionary translation. Gemini AI-enhanced
                        results will replace this automatically.
                    </p>
                </div>
            )}

            {resultSource === "ai" && (
                <div className="tw-flex tw-items-center tw-gap-3 tw-rounded-lg tw-border tw-border-green-200 tw-bg-green-50 tw-px-4 tw-py-3">
                    <i className="fas fa-check-circle tw-text-green-600" />
                    <p className="tw-text-sm tw-text-green-700">
                        AI-enhanced translation complete.
                    </p>
                </div>
            )}

            {/* Results card */}
            <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-space-y-6">
                <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-pb-4">
                    <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40]">
                        Your Translated Resume
                    </h2>
                    <p className="tw-text-xs tw-text-gray-400" aria-live="polite">
                        {isTranslating
                            ? "Editing available when AI translation completes..."
                            : "Click or tab to any text to edit. Use the remove button next to each bullet to delete it."}
                    </p>
                </div>

                <div>
                    <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-2">
                        Job Title
                    </h3>
                    <p className="tw-text-gray-700 tw-text-lg tw-font-medium">
                        {editableResult.jobTitle}
                    </p>
                    {targetJobTitle && (
                        <p className="tw-text-sm tw-text-gray-400 tw-mt-1">
                            Targeted For: {targetJobTitle}
                        </p>
                    )}
                </div>

                <div>
                    <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-2">
                        Professional Summary
                    </h3>
                    <p
                        role="textbox"
                        aria-label="Edit professional summary"
                        aria-multiline="true"
                        tabIndex={isTranslating ? undefined : 0}
                        contentEditable={!isTranslating}
                        suppressContentEditableWarning
                        onBlur={handleSummaryBlur}
                        className="tw-text-gray-700 tw-outline-none tw-rounded tw-p-1 hover:tw-bg-gray-50 focus:tw-bg-blue-50 focus:tw-ring-1 focus:tw-ring-blue-300"
                    >
                        {editableResult.summary}
                    </p>
                </div>

                {editableResult.keyResponsibilities.length > 0 && (
                    <div>
                        <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                            Key Responsibilities
                        </h3>
                        {renderBulletList(editableResult.keyResponsibilities, "keyResponsibilities")}
                    </div>
                )}

                {editableResult.achievements.length > 0 && (
                    <div>
                        <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                            Achievements
                        </h3>
                        {renderBulletList(editableResult.achievements, "achievements")}
                    </div>
                )}

                {/* Technical Skills Translation */}
                {editableResult.technicalSystems &&
                    editableResult.technicalSystems.length > 0 && (
                        <TechnicalSkillsSection
                            systems={editableResult.technicalSystems}
                        />
                    )}

                {/* Training & Education */}
                {editableResult.training && (
                    <TrainingSection
                        training={editableResult.training}
                        leadershipCourses={leadershipCourses}
                    />
                )}

                {suggestions.length > 0 && (
                    <div className="tw-bg-navy-sky/20 tw-p-6 tw-rounded-lg tw-border tw-border-blue-200">
                        <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                            Tips for Improvement
                        </h3>
                        <ul className="tw-space-y-2">
                            {suggestions.map((suggestion, idx) => (
                                <li
                                    key={idx}
                                    className="tw-flex tw-items-start tw-text-sm tw-text-gray-700"
                                >
                                    <i className="fas fa-lightbulb tw-text-[#c5203e] tw-mr-2 tw-mt-0.5" />
                                    <span>{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Certification Pathways */}
            {editableResult.certPathways && (
                <CertPathwaysCard certPathways={editableResult.certPathways} />
            )}

            {/* Career Pathways */}
            {editableResult.careerPathways &&
                editableResult.careerPathways.length > 0 && (
                    <CareerPathwaysCard
                        careerPathways={editableResult.careerPathways}
                    />
                )}

            {/* Hidden Strengths / Cognitive Skills */}
            {editableResult.cognitiveProfile && (
                <CognitiveSkillsCard cognitiveProfile={editableResult.cognitiveProfile} />
            )}

            {/* Action buttons */}
            <div className="tw-flex tw-gap-4 tw-justify-center tw-flex-wrap">
                <Button
                    onClick={handleDownloadPdf}
                    disabled={generatingPdf}
                    className="tw-transform tw-rounded-lg tw-bg-[#091f40] tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-[#0a2a5c] focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40] focus:tw-ring-offset-2 disabled:tw-opacity-50"
                >
                    {generatingPdf ? (
                        <>
                            <i className="fas fa-spinner fa-spin tw-mr-2" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-file-pdf tw-mr-2" />
                            Download PDF
                        </>
                    )}
                </Button>
                <Button
                    onClick={handleDownloadTxt}
                    variant="texted"
                    className="tw-inline-flex tw-items-center tw-transform tw-rounded-lg tw-border tw-border-gray-300 tw-bg-white tw-px-6 tw-py-3 tw-font-semibold tw-text-[#091f40] tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-500 focus:tw-ring-offset-2"
                >
                    <i className="fas fa-file-alt tw-mr-2" />
                    Download TXT
                </Button>
                <Button
                    onClick={handleCopyLinkedIn}
                    variant="texted"
                    className="tw-inline-flex tw-items-center tw-transform tw-rounded-lg tw-border tw-border-gray-300 tw-bg-white tw-px-6 tw-py-3 tw-font-semibold tw-text-[#091f40] tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-500 focus:tw-ring-offset-2"
                >
                    {linkedInCopied ? (
                        <>
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <i className="fab fa-linkedin tw-mr-2" />
                            Copy LinkedIn Summary
                        </>
                    )}
                </Button>
                <Button
                    onClick={onReset}
                    variant="texted"
                    className="tw-inline-flex tw-items-center tw-transform tw-rounded-lg tw-border tw-border-gray-300 tw-bg-white tw-px-6 tw-py-3 tw-font-semibold tw-text-[#091f40] tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-500 focus:tw-ring-offset-2"
                >
                    <i className="fas fa-redo tw-mr-2" />
                    Translate Another Resume
                </Button>
            </div>
        </div>
    );
};

export default TranslatorResults;
