import clsx from "clsx";
import React, { useCallback, useState } from "react";
import useTranslator from "@/hooks/use-translator";
import type { MilitaryProfile } from "@/lib/military-translator";
import type { JobCodeEntry } from "@/types/job-codes";
import TranslatorForm from "./TranslatorForm";
import TranslatorResults from "./TranslatorResults";

interface ResumeTranslatorProps {
    className?: string;
    jobCodeIndex: JobCodeEntry[];
}

const ResumeTranslator: React.FC<ResumeTranslatorProps> = ({ className, jobCodeIndex }) => {
    const {
        activeResult,
        isTranslating,
        error,
        resultSource,
        translate,
        reset,
    } = useTranslator();

    const [lastTargetJobTitle, setLastTargetJobTitle] = useState<string | undefined>();
    const [lastLeadershipCourses, setLastLeadershipCourses] = useState<string[] | undefined>();

    const handleSubmit = useCallback(
        (profile: MilitaryProfile) => {
            setLastTargetJobTitle(profile.targetJobTitle);
            setLastLeadershipCourses(profile.leadershipCourses);
            translate(profile);
        },
        [translate]
    );

    const handleReset = useCallback(() => {
        setLastTargetJobTitle(undefined);
        setLastLeadershipCourses(undefined);
        reset();
    }, [reset]);

    return (
        <div className={clsx("tw-space-y-8", className)}>
            <div className="tw-text-center tw-space-y-4">
                <h1 className="tw-text-4xl tw-font-bold tw-text-[#091f40]">
                    Military-to-Civilian Translator
                </h1>
                <p className="tw-text-lg tw-text-gray-300 tw-max-w-2xl tw-mx-auto">
                    Transform your military experience into civilian-friendly
                    resume language. You&apos;ll receive instant dictionary results,
                    then Gemini AI enhances them automatically.
                </p>
            </div>

            {!activeResult && (
                <TranslatorForm
                    onSubmit={handleSubmit}
                    isTranslating={isTranslating}
                    error={error}
                    jobCodeIndex={jobCodeIndex}
                />
            )}

            {activeResult && resultSource !== "none" && (
                <TranslatorResults
                    result={activeResult}
                    resultSource={resultSource as "dictionary" | "ai"}
                    isTranslating={isTranslating}
                    onReset={handleReset}
                    targetJobTitle={lastTargetJobTitle}
                    leadershipCourses={lastLeadershipCourses}
                />
            )}
        </div>
    );
};

export default ResumeTranslator;
