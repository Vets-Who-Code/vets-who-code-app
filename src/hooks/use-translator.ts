import { useCallback, useRef, useState } from "react";
import {
    fallbackTranslation,
    type MilitaryProfile,
    type TranslatedProfile,
} from "@/lib/military-translator";
import { trackTranslatorEvent } from "@/lib/translator-analytics";

export interface TranslatorState {
    dictionaryResult: TranslatedProfile | null;
    aiResult: TranslatedProfile | null;
    activeResult: TranslatedProfile | null;
    isTranslating: boolean;
    error: string | null;
    resultSource: "none" | "dictionary" | "ai";
}

export interface UseTranslatorReturn extends TranslatorState {
    translate: (profile: MilitaryProfile) => void;
    reset: () => void;
}

const INITIAL_STATE: TranslatorState = {
    dictionaryResult: null,
    aiResult: null,
    activeResult: null,
    isTranslating: false,
    error: null,
    resultSource: "none",
};

export default function useTranslator(): UseTranslatorReturn {
    const [state, setState] = useState<TranslatorState>(INITIAL_STATE);
    const requestIdRef = useRef(0);

    const translate = useCallback((profile: MilitaryProfile) => {
        const requestId = ++requestIdRef.current;

        trackTranslatorEvent({
            action: "translate_start",
            mosCode: profile.jobCode,
            branch: profile.branch,
        });

        setState((prev) => ({
            ...prev,
            isTranslating: true,
            error: null,
            dictionaryResult: null,
            aiResult: null,
            activeResult: null,
            resultSource: "none",
        }));

        // Phase 1: Instant dictionary translation
        const dictResult = fallbackTranslation(profile);

        trackTranslatorEvent({
            action: "translate_complete",
            mosCode: profile.jobCode,
            source: "dictionary",
        });

        setState((prev) => ({
            ...prev,
            dictionaryResult: dictResult,
            activeResult: dictResult,
            resultSource: "dictionary",
        }));

        // Phase 2: AI translation + career pathways in parallel
        const translatePromise = fetch("/api/military-resume/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jobTitle: profile.jobTitle || "",
                rank: profile.rank || "",
                branch: profile.branch || "",
                duties: profile.duties || "",
                achievements: profile.achievements || "",
                jobCode: profile.jobCode,
                jobCodeBranch: profile.jobCodeBranch,
                targetJobTitle: profile.targetJobTitle,
                yearsOfService: profile.yearsOfService,
                securityClearance: profile.securityClearance,
                skillLevel: profile.skillLevel,
                deploymentHistory: profile.deploymentHistory,
                leadershipCourses: profile.leadershipCourses,
                collateralDuties: profile.collateralDuties,
                certificationsEarned: profile.certificationsEarned,
            }),
        });

        const careerPromise = fetch("/api/military-resume/career-pathways", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jobCode: profile.jobCode,
                jobTitle: profile.jobTitle,
                targetJobTitle: profile.targetJobTitle,
            }),
        }).then((r) => (r.ok ? r.json() : null)).catch(() => null);

        Promise.all([translatePromise, careerPromise])
            .then(async ([translateRes, careerData]) => {
                if (requestIdRef.current !== requestId) return;

                if (!translateRes.ok) {
                    // AI failed — enrich the dictionary result with career pathways
                    // so the user still sees enrichment cards
                    if (careerData?.pathways?.length > 0) {
                        setState((prev) => {
                            const enriched = prev.dictionaryResult
                                ? { ...prev.dictionaryResult, careerPathways: careerData.pathways }
                                : prev.dictionaryResult;
                            return {
                                ...prev,
                                dictionaryResult: enriched,
                                activeResult: enriched,
                                isTranslating: false,
                            };
                        });
                    } else {
                        setState((prev) => ({ ...prev, isTranslating: false }));
                    }
                    return;
                }

                const aiResult: TranslatedProfile = await translateRes.json();

                // Merge career pathways if available
                if (careerData?.pathways?.length > 0) {
                    aiResult.careerPathways = careerData.pathways;
                }

                trackTranslatorEvent({
                    action: "translate_complete",
                    mosCode: profile.jobCode,
                    source: "ai",
                });

                setState((prev) => ({
                    ...prev,
                    aiResult,
                    activeResult: aiResult,
                    isTranslating: false,
                    resultSource: "ai",
                }));
            })
            .catch(() => {
                if (requestIdRef.current !== requestId) return;
                setState((prev) => ({ ...prev, isTranslating: false }));
            });
    }, []);

    const reset = useCallback(() => {
        requestIdRef.current++;
        setState(INITIAL_STATE);
    }, []);

    return { ...state, translate, reset };
}
