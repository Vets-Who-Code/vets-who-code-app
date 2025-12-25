import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import Input from "@ui/form-elements/input";
import Textarea from "@ui/form-elements/textarea";
import Feedback from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import {
    translateMilitaryProfile,
    formatForResume,
    getSuggestions,
    type TranslatedProfile,
    type MilitaryProfile,
} from "@/lib/military-translator";

interface IFormValues {
    jobTitle: string;
    rank: string;
    branch: string;
    duties: string;
    achievements: string;
}

interface ResumeTranslatorProps {
    className?: string;
}

const ResumeTranslator: React.FC<ResumeTranslatorProps> = ({ className }) => {
    const [isTranslating, setIsTranslating] = useState(false);
    const [translatedProfile, setTranslatedProfile] = useState<TranslatedProfile | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        setIsTranslating(true);
        setErrorMessage("");
        setTranslatedProfile(null);
        setSuggestions([]);

        try {
            const profile: MilitaryProfile = {
                jobTitle: data.jobTitle,
                rank: data.rank,
                branch: data.branch,
                duties: data.duties,
                achievements: data.achievements,
            };

            const translated = await translateMilitaryProfile(profile);
            setTranslatedProfile(translated);

            // Get suggestions for improvement
            const allSuggestions: string[] = [];
            translated.keyResponsibilities.forEach((resp) => {
                const respSuggestions = getSuggestions(resp);
                allSuggestions.push(...respSuggestions);
            });

            // Remove duplicates
            setSuggestions([...new Set(allSuggestions)]);
        } catch (error) {
            console.error("Translation error:", error);
            setErrorMessage(
                "Failed to translate resume. Please try again or contact support if the issue persists."
            );
        } finally {
            setIsTranslating(false);
        }
    };

    const handleDownload = () => {
        if (!translatedProfile) return;

        const resumeText = formatForResume(translatedProfile);
        const blob = new Blob([resumeText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "civilian-resume.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        reset();
        setTranslatedProfile(null);
        setErrorMessage("");
        setSuggestions([]);
    };

    return (
        <div className={clsx("tw-space-y-8", className)}>
            {/* Header Section */}
            <div className="tw-text-center tw-space-y-4">
                <h1 className="tw-text-4xl tw-font-bold tw-text-[#091f40]">
                    Military Resume Translator
                </h1>
                <p className="tw-text-lg tw-text-gray-300 tw-max-w-2xl tw-mx-auto">
                    Transform your military experience into civilian-friendly resume language.
                    Enter your military job details below and we'll help you translate them
                    into terms that civilian employers understand.
                </p>
            </div>

            {/* Input Form */}
            {!translatedProfile && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="tw-space-y-6 tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg"
                >
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                        <div className="tw-space-y-2">
                            <label
                                htmlFor="jobTitle"
                                className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                            >
                                Military Job Title (MOS/Rating) *
                            </label>
                            <Input
                                id="jobTitle"
                                placeholder="e.g., Infantry Squad Leader, Hospital Corpsman"
                                className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                                feedbackText={errors?.jobTitle?.message}
                                state={hasKey(errors, "jobTitle") ? "error" : "success"}
                                showState={!!hasKey(errors, "jobTitle")}
                                {...register("jobTitle", {
                                    required: "Job title is required",
                                })}
                            />
                        </div>

                        <div className="tw-space-y-2">
                            <label
                                htmlFor="rank"
                                className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                            >
                                Rank *
                            </label>
                            <Input
                                id="rank"
                                placeholder="e.g., Sergeant, Petty Officer First Class"
                                className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                                feedbackText={errors?.rank?.message}
                                state={hasKey(errors, "rank") ? "error" : "success"}
                                showState={!!hasKey(errors, "rank")}
                                {...register("rank", {
                                    required: "Rank is required",
                                })}
                            />
                        </div>
                    </div>

                    <div className="tw-space-y-2">
                        <label
                            htmlFor="branch"
                            className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                        >
                            Branch of Service *
                        </label>
                        <Input
                            id="branch"
                            placeholder="e.g., U.S. Army, U.S. Navy, U.S. Marine Corps"
                            className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                            feedbackText={errors?.branch?.message}
                            state={hasKey(errors, "branch") ? "error" : "success"}
                            showState={!!hasKey(errors, "branch")}
                            {...register("branch", {
                                required: "Branch is required",
                            })}
                        />
                    </div>

                    <div className="tw-space-y-2">
                        <label
                            htmlFor="duties"
                            className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                        >
                            Key Duties & Responsibilities *
                        </label>
                        <p className="tw-text-sm tw-text-gray-500">
                            List each duty on a new line. Be specific about what you did.
                        </p>
                        <Textarea
                            id="duties"
                            placeholder="Example:&#10;Supervised squad of 9 personnel in combat operations&#10;Conducted tactical operations planning and execution&#10;Maintained accountability for $2M in equipment"
                            rows={6}
                            className="tw-w-full tw-resize-none tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                            feedbackText={errors?.duties?.message}
                            state={hasKey(errors, "duties") ? "error" : "success"}
                            showState={!!hasKey(errors, "duties")}
                            {...register("duties", {
                                required: "Duties are required",
                            })}
                        />
                    </div>

                    <div className="tw-space-y-2">
                        <label
                            htmlFor="achievements"
                            className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                        >
                            Achievements & Awards (Optional)
                        </label>
                        <p className="tw-text-sm tw-text-gray-500">
                            List each achievement on a new line. Include specific results when possible.
                        </p>
                        <Textarea
                            id="achievements"
                            placeholder="Example:&#10;Received Army Commendation Medal for superior performance&#10;Reduced equipment loss by 40% through improved inventory procedures&#10;Mentored 15 junior soldiers for promotion"
                            rows={5}
                            className="tw-w-full tw-resize-none tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                            {...register("achievements")}
                        />
                    </div>

                    <div className="tw-flex tw-gap-4">
                        <Button
                            type="submit"
                            disabled={isTranslating}
                            className="tw-flex-1 tw-transform tw-rounded-lg tw-bg-[#c5203e] tw-px-6 tw-py-4 tw-font-semibold tw-text-white tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-[#a91b35] focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#c5203e] focus:tw-ring-offset-2 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                        >
                            {isTranslating ? "Translating..." : "Translate to Civilian Resume"}
                        </Button>
                    </div>

                    {errorMessage && (
                        <Feedback state="error">
                            {errorMessage}
                        </Feedback>
                    )}
                </form>
            )}

            {/* Results Section */}
            {translatedProfile && (
                <div className="tw-space-y-6">
                    <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-space-y-6">
                        <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-border-b tw-pb-4">
                            Your Translated Resume
                        </h2>

                        {/* Job Title */}
                        <div>
                            <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-2">
                                Job Title
                            </h3>
                            <p className="tw-text-gray-200 tw-text-lg tw-font-medium">
                                {translatedProfile.jobTitle}
                            </p>
                        </div>

                        {/* Professional Summary */}
                        <div>
                            <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-2">
                                Professional Summary
                            </h3>
                            <p className="tw-text-gray-200">{translatedProfile.summary}</p>
                        </div>

                        {/* Key Responsibilities */}
                        {translatedProfile.keyResponsibilities.length > 0 && (
                            <div>
                                <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                                    Key Responsibilities
                                </h3>
                                <ul className="tw-space-y-2">
                                    {translatedProfile.keyResponsibilities.map((resp, idx) => (
                                        <li
                                            key={idx}
                                            className="tw-flex tw-items-start tw-text-gray-200"
                                        >
                                            <span className="tw-text-[#c5203e] tw-mr-3 tw-mt-1">
                                                •
                                            </span>
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Achievements */}
                        {translatedProfile.achievements.length > 0 && (
                            <div>
                                <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                                    Achievements
                                </h3>
                                <ul className="tw-space-y-2">
                                    {translatedProfile.achievements.map((achievement, idx) => (
                                        <li
                                            key={idx}
                                            className="tw-flex tw-items-start tw-text-gray-200"
                                        >
                                            <span className="tw-text-[#c5203e] tw-mr-3 tw-mt-1">
                                                •
                                            </span>
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="tw-bg-navy-sky/20 tw-p-6 tw-rounded-lg tw-border tw-border-blue-200">
                                <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                                    Tips for Improvement
                                </h3>
                                <ul className="tw-space-y-2">
                                    {suggestions.map((suggestion, idx) => (
                                        <li
                                            key={idx}
                                            className="tw-flex tw-items-start tw-text-sm tw-text-gray-200"
                                        >
                                            <span className="tw-text-navy-royal tw-mr-2 tw-mt-0.5">
                                                ℹ️
                                            </span>
                                            <span>{suggestion}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="tw-flex tw-gap-4 tw-justify-center">
                        <Button
                            onClick={handleDownload}
                            className="tw-transform tw-rounded-lg tw-bg-[#091f40] tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-[#0a2a5c] focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40] focus:tw-ring-offset-2"
                        >
                            Download Resume
                        </Button>
                        <Button
                            onClick={handleReset}
                            className="tw-transform tw-rounded-lg tw-bg-gray-50 tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-gray-300 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-500 focus:tw-ring-offset-2"
                        >
                            Translate Another Resume
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeTranslator;
