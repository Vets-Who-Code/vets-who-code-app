import Button from "@ui/button";
import Feedback from "@ui/form-elements/feedback";
import Input from "@ui/form-elements/input";
import Textarea from "@ui/form-elements/textarea";
import { hasKey } from "@utils/methods";
import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { MilitaryProfile } from "@/lib/military-translator";
import { trackTranslatorEvent } from "@/lib/translator-analytics";
import type { JobCodeEntry } from "@/types/job-codes";
import { usePdfUpload } from "@/hooks";
import JobCodeCombobox from "./JobCodeCombobox";

interface IFormValues {
    jobTitle: string;
    rank: string;
    branch: string;
    duties: string;
    achievements: string;
    targetJobTitle: string;
    yearsOfService: string;
    securityClearance: string;
    skillLevel: string;
    deploymentHistory: string;
    certificationsEarned: string;
}

interface TranslatorFormProps {
    onSubmit: (profile: MilitaryProfile) => void;
    isTranslating: boolean;
    error: string | null;
    jobCodeIndex: JobCodeEntry[];
}

const BRANCH_OPTIONS = [
    "U.S. Army",
    "U.S. Navy",
    "U.S. Marine Corps",
    "U.S. Air Force",
    "U.S. Space Force",
    "U.S. Coast Guard",
    "U.S. National Guard",
];

const CLEARANCE_OPTIONS = ["None", "Secret", "Top Secret", "TS/SCI"];

const SKILL_LEVEL_OPTIONS = [
    { value: "10", label: "10-level (Apprentice / E-1 to E-3)" },
    { value: "20", label: "20-level (Journeyman / E-4)" },
    { value: "30", label: "30-level (Advanced / E-5)" },
    { value: "40", label: "40-level (Senior / E-6+)" },
];

const DEPLOYMENT_OPTIONS = [
    { value: "none", label: "No deployments" },
    { value: "1", label: "1 deployment" },
    { value: "2", label: "2 deployments" },
    { value: "3+", label: "3+ deployments" },
];

const LEADERSHIP_COURSES = [
    "WLC/BLC (Warrior Leader / Basic Leader Course)",
    "ALC/SLC (Advanced / Senior Leader Course)",
    "NCOA (NCO Academy)",
    "OCS (Officer Candidate School)",
    "BOLC (Basic Officer Leader Course)",
    "Airborne School",
    "Air Assault School",
    "Ranger School",
    "Pathfinder School",
    "Master Fitness Trainer",
    "Equal Opportunity Leader Course",
    "Battle Staff NCO Course",
    "First Sergeant Course",
    "Sergeant Major Academy",
];

const COLLATERAL_DUTIES = [
    { value: "unit_safety_officer", label: "Unit Safety Officer/NCO" },
    { value: "equal_opportunity_rep", label: "Equal Opportunity Representative" },
    { value: "training_nco", label: "Training NCO/Officer" },
    { value: "key_control", label: "Key Control Custodian" },
    { value: "arms_room", label: "Arms Room Officer/NCO" },
    { value: "hazmat_nco", label: "HAZMAT NCO" },
    { value: "physical_fitness", label: "Physical Fitness Leader" },
    { value: "records_management", label: "Records Management Officer" },
    { value: "sharp_rep", label: "SHARP Representative" },
    { value: "supply_accountability", label: "Supply Accountability NCO" },
    { value: "unit_prevention", label: "Unit Prevention Leader" },
    { value: "voting_assistance", label: "Voting Assistance Officer" },
    { value: "resilience_trainer", label: "Resilience/Master Fitness Trainer" },
    { value: "comsec_custodian", label: "COMSEC Custodian" },
    { value: "public_affairs", label: "Unit Public Affairs Representative" },
];

const TranslatorForm: React.FC<TranslatorFormProps> = ({
    onSubmit,
    isTranslating,
    error,
    jobCodeIndex,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        trigger,
        formState: { errors },
    } = useForm<IFormValues>();

    const [selectedJobCode, setSelectedJobCode] = useState<JobCodeEntry | null>(null);
    const [dutiesAutoFilled, setDutiesAutoFilled] = useState(false);
    const [fetchingDescription, setFetchingDescription] = useState(false);
    const [pdfParsedText, setPdfParsedText] = useState<string | null>(null);
    const [extractingFields, setExtractingFields] = useState(false);
    const [enrichmentOpen, setEnrichmentOpen] = useState(false);
    const [selectedLeadershipCourses, setSelectedLeadershipCourses] = useState<string[]>([]);
    const [selectedCollateralDuties, setSelectedCollateralDuties] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        upload: uploadPdf,
        uploading: pdfUploading,
        error: pdfError,
        progress: pdfProgress,
        fileName: pdfFileName,
        reset: resetPdf,
    } = usePdfUpload();

    const jobTitleValue = watch("jobTitle", "");
    const branchValue = watch("branch", "");

    const handleJobCodeSelect = useCallback(
        async (entry: JobCodeEntry) => {
            setSelectedJobCode(entry);
            setFetchingDescription(true);
            try {
                const res = await fetch(
                    `/api/military-resume/job-code?branch=${entry.branch}&code=${encodeURIComponent(entry.code)}`
                );
                if (res.ok) {
                    const data = await res.json();
                    // Split the raw MOS description into individual duty lines
                    // so the textarea is readable and the translator gets structured input
                    const formatted = (data.description as string)
                        .split(";")
                        .map((s: string) => s.trim())
                        .filter((s: string) => s.length > 15)
                        .map((s: string) => {
                            // Strip trailing period, capitalize first letter
                            const clean = s.replace(/\.\s*$/, "").trim();
                            return clean.charAt(0).toUpperCase() + clean.slice(1);
                        })
                        .join("\n");
                    setValue("duties", formatted, { shouldValidate: true });
                    setDutiesAutoFilled(true);
                }
            } catch {
                // Silently fail — user can still type duties manually
            } finally {
                setFetchingDescription(false);
            }
        },
        [setValue]
    );

    const handlePdfUpload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            // Reset file input so the same file can be re-selected
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            try {
                const text = await uploadPdf(file);
                setPdfParsedText(text);
                setValue("duties", text, { shouldValidate: true });
                setDutiesAutoFilled(false);

                // Try AI-powered field extraction
                setExtractingFields(true);
                try {
                    const res = await fetch("/api/military-resume/extract-fields", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ text }),
                    });
                    if (res.ok) {
                        const fields = await res.json();
                        if (fields.branch) setValue("branch", fields.branch, { shouldValidate: true });
                        if (fields.rank) setValue("rank", fields.rank, { shouldValidate: true });
                        if (fields.jobTitle) setValue("jobTitle", fields.jobTitle, { shouldValidate: true });
                        if (fields.duties) {
                            setValue("duties", fields.duties, { shouldValidate: true });
                            setDutiesAutoFilled(true);
                        }
                        if (fields.achievements) setValue("achievements", fields.achievements);
                    }
                } catch {
                    // Silent fallback — raw text is already in duties
                } finally {
                    setExtractingFields(false);
                }
            } catch {
                // Error is already tracked via the hook state
            }
        },
        [uploadPdf, setValue]
    );

    const handleTranslateNow = useCallback(async () => {
        if (!pdfParsedText) return;
        const valid = await trigger();
        if (!valid) return;
        const values = getValues();
        onSubmit({
            jobTitle: values.jobTitle || "",
            rank: values.rank || "",
            branch: values.branch || "",
            duties: values.duties || "",
            achievements: values.achievements || "",
            jobCode: selectedJobCode?.code,
            jobCodeBranch: selectedJobCode?.branch,
            targetJobTitle: values.targetJobTitle || undefined,
            yearsOfService: values.yearsOfService ? parseInt(values.yearsOfService, 10) : undefined,
            securityClearance: values.securityClearance || undefined,
            skillLevel: values.skillLevel || undefined,
            deploymentHistory: values.deploymentHistory || undefined,
            leadershipCourses: selectedLeadershipCourses.length > 0 ? selectedLeadershipCourses : undefined,
            collateralDuties: selectedCollateralDuties.length > 0 ? selectedCollateralDuties : undefined,
            certificationsEarned: values.certificationsEarned || undefined,
        });
    }, [pdfParsedText, getValues, onSubmit, selectedJobCode, trigger, selectedLeadershipCourses, selectedCollateralDuties]);

    const handleFormSubmit: SubmitHandler<IFormValues> = (data) => {
        onSubmit({
            jobTitle: data.jobTitle,
            rank: data.rank,
            branch: data.branch,
            duties: data.duties,
            achievements: data.achievements,
            jobCode: selectedJobCode?.code,
            jobCodeBranch: selectedJobCode?.branch,
            targetJobTitle: data.targetJobTitle || undefined,
            yearsOfService: data.yearsOfService ? parseInt(data.yearsOfService, 10) : undefined,
            securityClearance: data.securityClearance || undefined,
            skillLevel: data.skillLevel || undefined,
            deploymentHistory: data.deploymentHistory || undefined,
            leadershipCourses: selectedLeadershipCourses.length > 0 ? selectedLeadershipCourses : undefined,
            collateralDuties: selectedCollateralDuties.length > 0 ? selectedCollateralDuties : undefined,
            certificationsEarned: data.certificationsEarned || undefined,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="tw-space-y-6 tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg"
        >
            <div className="tw-border-b tw-border-gray-100 tw-pb-4">
                <p className="tw-text-sm tw-text-gray-300">
                    Instant dictionary results. AI-enhanced results arrive automatically.
                </p>
            </div>

            <div className="tw-space-y-2">
                <label
                    htmlFor="branch"
                    className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                >
                    Branch of Service{" "}
                    <span className="tw-text-danger">*</span>
                </label>
                <select
                    id="branch"
                    className={clsx(
                        "tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]",
                        hasKey(errors, "branch") && "!tw-border-danger"
                    )}
                    {...register("branch", {
                        required: "Branch is required",
                    })}
                >
                    <option value="">Select your branch...</option>
                    {BRANCH_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
                {errors.branch && (
                    <p className="tw-mt-1 tw-text-sm tw-text-danger">
                        {errors.branch.message}
                    </p>
                )}
            </div>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                <div className="tw-space-y-2">
                    <label
                        htmlFor="jobTitle"
                        className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                    >
                        Military Job Code (MOS/Rating){" "}
                        <span className="tw-text-danger">*</span>
                    </label>
                    <p className="tw-text-xs tw-text-gray-400">
                        Type your job code to search the database, or enter a title manually.
                    </p>
                    <input type="hidden" {...register("jobTitle", { required: "Job title is required" })} />
                    <JobCodeCombobox
                        jobCodeIndex={jobCodeIndex}
                        selectedBranch={branchValue}
                        value={jobTitleValue}
                        onChange={(val) => {
                            setValue("jobTitle", val, { shouldValidate: true });
                            if (dutiesAutoFilled) setDutiesAutoFilled(false);
                        }}
                        onSelect={handleJobCodeSelect}
                        className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                    />
                    {errors.jobTitle && (
                        <p className="tw-mt-1 tw-text-sm tw-text-danger">
                            {errors.jobTitle.message}
                        </p>
                    )}
                </div>

                <div className="tw-space-y-2">
                    <label
                        htmlFor="rank"
                        className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                    >
                        Rank <span className="tw-text-danger">*</span>
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

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                <div className="tw-space-y-2">
                    <label
                        htmlFor="yearsOfService"
                        className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                    >
                        Years of Service{" "}
                        <span className="tw-text-danger">*</span>
                    </label>
                    <Input
                        id="yearsOfService"
                        type="number"
                        placeholder="e.g., 4"
                        className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                        feedbackText={errors?.yearsOfService?.message}
                        state={hasKey(errors, "yearsOfService") ? "error" : "success"}
                        showState={!!hasKey(errors, "yearsOfService")}
                        {...register("yearsOfService", {
                            required: "Years of service is required",
                            min: { value: 1, message: "Must be at least 1 year" },
                            max: { value: 40, message: "Must be 40 years or less" },
                        })}
                    />
                </div>

                <div className="tw-space-y-2">
                    <label
                        htmlFor="securityClearance"
                        className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                    >
                        Security Clearance{" "}
                        <span className="tw-text-xs tw-text-gray-300">
                            (Optional)
                        </span>
                    </label>
                    <select
                        id="securityClearance"
                        className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                        {...register("securityClearance")}
                    >
                        <option value="">Select clearance level...</option>
                        {CLEARANCE_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* PDF Resume Upload */}
            <div className="tw-space-y-3 tw-rounded-lg tw-border tw-border-dashed tw-border-gray-300 tw-bg-gray-50 tw-p-5">
                <div className="tw-flex tw-items-center tw-justify-between">
                    <div>
                        <p className="tw-text-sm tw-font-medium tw-text-[#091f40]">
                            Upload Military Resume (PDF or DOCX)
                        </p>
                        <p className="tw-text-xs tw-text-gray-400">
                            Upload your existing resume to pre-fill the form. Max 5MB.
                        </p>
                    </div>
                    {pdfFileName && !pdfUploading && !pdfError && (
                        <button
                            type="button"
                            onClick={() => {
                                resetPdf();
                                setPdfParsedText(null);
                            }}
                            className="tw-text-xs tw-text-gray-400 hover:tw-text-gray-600"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.docx"
                    onChange={handlePdfUpload}
                    className="tw-hidden"
                    id="pdf-upload"
                />

                {!pdfFileName && !pdfUploading && (
                    <label
                        htmlFor="pdf-upload"
                        className="tw-inline-flex tw-cursor-pointer tw-items-center tw-gap-2 tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-[#091f40] tw-transition hover:tw-bg-gray-100"
                    >
                        <i className="fas fa-file-upload" />
                        Choose PDF or DOCX File
                    </label>
                )}

                {pdfUploading && (
                    <div className="tw-space-y-2">
                        <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-500">
                            <i className="fas fa-spinner fa-spin" />
                            Extracting text from {pdfFileName}...
                        </div>
                        <div className="tw-h-2 tw-overflow-hidden tw-rounded-full tw-bg-gray-200">
                            <div
                                className="tw-h-full tw-rounded-full tw-bg-[#091f40] tw-transition-all tw-duration-300"
                                style={{ width: `${pdfProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                {pdfError && (
                    <div className="tw-flex tw-items-start tw-gap-2 tw-rounded-md tw-bg-red-50 tw-p-3 tw-text-sm tw-text-red-700">
                        <i className="fas fa-exclamation-circle tw-mt-0.5" />
                        <span>{pdfError}</span>
                    </div>
                )}

                {pdfFileName && !pdfUploading && !pdfError && (
                    <div className="tw-space-y-3">
                        <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-green-600">
                            <i className="fas fa-check-circle" />
                            Extracted text from {pdfFileName}
                        </div>
                        {extractingFields && (
                            <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-blue-600">
                                <i className="fas fa-spinner fa-spin" />
                                AI is analyzing your resume...
                            </div>
                        )}
                        <Button
                            type="button"
                            onClick={handleTranslateNow}
                            disabled={isTranslating}
                            className="tw-rounded-lg tw-bg-[#091f40] tw-px-5 tw-py-2.5 tw-text-sm tw-font-semibold tw-text-white tw-transition hover:tw-bg-[#0d2d5e] disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                        >
                            {isTranslating ? (
                                <>
                                    <i className="fas fa-spinner fa-spin tw-mr-2" />
                                    Translating...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-bolt tw-mr-2" />
                                    Translate Now
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <div className="tw-space-y-2">
                <label
                    htmlFor="duties"
                    className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                >
                    Key Duties &amp; Responsibilities{" "}
                    <span className="tw-text-danger">*</span>
                </label>
                <p className="tw-text-sm tw-text-gray-500">
                    {fetchingDescription
                        ? "Loading duties from MOS database..."
                        : "List each duty on a new line. Be specific about what you did."}
                </p>
                {dutiesAutoFilled && (
                    <p className="tw-text-xs tw-font-medium tw-text-green-600">
                        <i className="fas fa-check-circle tw-mr-1" />
                        Auto-filled from MOS database. Edit as needed.
                    </p>
                )}
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
                        onChange: () => {
                            if (dutiesAutoFilled) setDutiesAutoFilled(false);
                        },
                    })}
                />
            </div>

            <div className="tw-space-y-2">
                <label
                    htmlFor="achievements"
                    className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                >
                    Achievements &amp; Awards{" "}
                    <span className="tw-text-xs tw-text-gray-300">
                        (Optional)
                    </span>
                </label>
                <p className="tw-text-sm tw-text-gray-500">
                    List each achievement on a new line. Include specific
                    results when possible.
                </p>
                <Textarea
                    id="achievements"
                    placeholder="Example:&#10;Received Army Commendation Medal for superior performance&#10;Reduced equipment loss by 40% through improved inventory procedures&#10;Mentored 15 junior soldiers for promotion"
                    rows={5}
                    className="tw-w-full tw-resize-none tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                    {...register("achievements")}
                />
            </div>

            <div className="tw-space-y-2">
                <label
                    htmlFor="targetJobTitle"
                    className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                >
                    Target Civilian Job Title{" "}
                    <span className="tw-text-xs tw-text-gray-300">
                        (Optional)
                    </span>
                </label>
                <p className="tw-text-sm tw-text-gray-500">
                    If you have a specific role in mind, enter it here to tailor
                    your resume translation.
                </p>
                <Input
                    id="targetJobTitle"
                    placeholder="e.g., Project Manager, Operations Analyst, IT Specialist"
                    className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                    {...register("targetJobTitle")}
                />
            </div>

            {/* Enrichment Section — Collapsible */}
            <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-gray-50">
                <button
                    type="button"
                    onClick={() => {
                        const newState = !enrichmentOpen;
                        setEnrichmentOpen(newState);
                        trackTranslatorEvent({ action: "enrichment_toggle", open: newState });
                    }}
                    className="tw-flex tw-w-full tw-items-center tw-justify-between tw-px-5 tw-py-4 tw-text-left"
                >
                    <div>
                        <p className="tw-text-sm tw-font-semibold tw-text-[#091f40]">
                            <i className="fas fa-star tw-mr-2 tw-text-[#c5203e]" />
                            Add more detail for stronger results
                        </p>
                        <p className="tw-text-xs tw-text-gray-400 tw-mt-0.5">
                            Optional fields that unlock deeper translation layers
                        </p>
                    </div>
                    <i
                        className={clsx(
                            "fas fa-chevron-down tw-text-gray-400 tw-transition-transform tw-duration-200",
                            enrichmentOpen && "tw-rotate-180"
                        )}
                    />
                </button>

                {enrichmentOpen && (
                    <div className="tw-space-y-6 tw-border-t tw-border-gray-200 tw-px-5 tw-py-5">
                        {/* Skill Level + Deployment History */}
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                            <div className="tw-space-y-2">
                                <label
                                    htmlFor="skillLevel"
                                    className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                                >
                                    Skill Level{" "}
                                    <span className="tw-text-xs tw-text-gray-300">(Army/Marines)</span>
                                </label>
                                <select
                                    id="skillLevel"
                                    className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                                    {...register("skillLevel")}
                                >
                                    <option value="">Select skill level...</option>
                                    {SKILL_LEVEL_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="tw-space-y-2">
                                <label
                                    htmlFor="deploymentHistory"
                                    className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                                >
                                    Deployment History
                                </label>
                                <select
                                    id="deploymentHistory"
                                    className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                                    {...register("deploymentHistory")}
                                >
                                    <option value="">Select deployment history...</option>
                                    {DEPLOYMENT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Leadership Courses */}
                        <div className="tw-space-y-2">
                            <p className="tw-text-sm tw-font-medium tw-text-[#091f40]">
                                Leadership Courses Completed
                            </p>
                            <p className="tw-text-xs tw-text-gray-400">
                                Select all that apply. These add formal training hours to your profile.
                            </p>
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2">
                                {LEADERSHIP_COURSES.map((course) => (
                                    <label
                                        key={course}
                                        className="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-rounded tw-px-2 tw-py-1.5 hover:tw-bg-white tw-text-sm tw-text-[#091f40]"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedLeadershipCourses.includes(course)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedLeadershipCourses((prev) => [...prev, course]);
                                                } else {
                                                    setSelectedLeadershipCourses((prev) =>
                                                        prev.filter((c) => c !== course)
                                                    );
                                                }
                                            }}
                                            className="tw-rounded tw-border-gray-300"
                                        />
                                        {course}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Collateral Duties */}
                        <div className="tw-space-y-2">
                            <p className="tw-text-sm tw-font-medium tw-text-[#091f40]">
                                Collateral Duties Held
                            </p>
                            <p className="tw-text-xs tw-text-gray-400">
                                Each duty maps to a civilian competency area and generates additional resume bullets.
                            </p>
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2">
                                {COLLATERAL_DUTIES.map((duty) => (
                                    <label
                                        key={duty.value}
                                        className="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-rounded tw-px-2 tw-py-1.5 hover:tw-bg-white tw-text-sm tw-text-[#091f40]"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCollateralDuties.includes(duty.value)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedCollateralDuties((prev) => [...prev, duty.value]);
                                                } else {
                                                    setSelectedCollateralDuties((prev) =>
                                                        prev.filter((d) => d !== duty.value)
                                                    );
                                                }
                                            }}
                                            className="tw-rounded tw-border-gray-300"
                                        />
                                        {duty.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Certifications Earned */}
                        <div className="tw-space-y-2">
                            <label
                                htmlFor="certificationsEarned"
                                className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                            >
                                Certifications Earned in Service
                            </label>
                            <p className="tw-text-xs tw-text-gray-400">
                                List any certifications obtained during service (e.g., Security+, EMT-B, CDL, HAZMAT).
                            </p>
                            <Input
                                id="certificationsEarned"
                                placeholder="e.g., CompTIA Security+, EMT-B, CDL Class A"
                                className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                                {...register("certificationsEarned")}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="tw-flex tw-gap-4">
                <Button
                    type="submit"
                    disabled={isTranslating}
                    className="tw-flex-1 tw-transform tw-rounded-lg tw-bg-[#c5203e] tw-px-6 tw-py-4 tw-font-semibold tw-text-white tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-[#a91b35] focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#c5203e] focus:tw-ring-offset-2 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                >
                    {isTranslating ? (
                        <>
                            <i className="fas fa-spinner fa-spin tw-mr-2" />
                            Translating...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-language tw-mr-2" />
                            Translate to Civilian Resume
                        </>
                    )}
                </Button>
            </div>

            {error && <Feedback state="error">{error}</Feedback>}
        </form>
    );
};

export default TranslatorForm;
