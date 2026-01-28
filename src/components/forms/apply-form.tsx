import EmojiRain from "@components/EmojiRain";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Input from "@ui/form-elements/input";
import Checkbox from "@ui/form-elements/checkbox";
import TextArea from "@ui/form-elements/textarea";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import { linkedinRegex, githubRegex } from "@utils/formValidations";
import { motion, AnimatePresence } from "motion/react";
import { validateEmail, validateUrl } from "@utils/validators";

interface IFormValues {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    branchOfService: string;
    yearJoined: string;
    yearSeparated: string;
    hasAttendedPreviousCourse: boolean;
    previousCourses: string;
    willAttendAnotherCourse: boolean;
    otherCourses: string;
    linkedInAccountName: string;
    githubAccountName: string;
    preworkLink: string;
    preworkRepo: string;
}

const STEPS = [
    { id: 1, title: "Personal Info", fields: ["firstName", "lastName", "email"] },
    { id: 2, title: "Location", fields: ["city", "state", "zipCode", "country"] },
    {
        id: 3,
        title: "Military Background",
        fields: ["branchOfService", "yearJoined", "yearSeparated"],
    },
    {
        id: 4,
        title: "Education History",
        fields: [
            "hasAttendedPreviousCourse",
            "previousCourses",
            "willAttendAnotherCourse",
            "otherCourses",
        ],
    },
    {
        id: 5,
        title: "Technical Profiles",
        fields: ["linkedInAccountName", "githubAccountName", "preworkLink", "preworkRepo"],
    },
] as const;

const ApplyForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [message, setMessage] = useState("");
    const [showEmojiRain, setShowEmojiRain] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        trigger,
    } = useForm<IFormValues>({
        mode: "onBlur",
    });

    const watchHasAttendedPreviousCourses = watch("hasAttendedPreviousCourse", false);
    const watchWillAttendAnotherCourse = watch("willAttendAnotherCourse", false);

    const nextStep = async () => {
        const currentFields = STEPS[currentStep - 1].fields;
        const isValid = await trigger(currentFields as unknown as (keyof IFormValues)[]);

        if (isValid && currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
            e.preventDefault();
        }
    };

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            setIsSubmitting(true);

            // Transform data to match API expectations
            const parseOrNull = (value: string) => {
                const parsed = parseInt(value, 10);
                return isNaN(parsed) ? null : parsed;
            };
            const formData = {
                ...data,
                zipCode: parseOrNull(data.zipCode),
                yearJoined: parseOrNull(data.yearJoined),
                yearSeparated: parseOrNull(data.yearSeparated),
            };

            await axios.post("/api/apply", formData);
            setMessage("Thank you for your application! We'll review it and get back to you soon.");
            setShowEmojiRain(true);

            setTimeout(() => {
                setShowEmojiRain(false);
                setCurrentStep(1);
                reset();
            }, 5000);
        } catch (error) {
            setMessage("Failed to submit the form. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const progressPercentage = (currentStep / STEPS.length) * 100;

    return (
        <div className="tw-px-4 tw-py-8 md:tw-px-8 lg:tw-px-[250px]">
            {message ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="tw-from-primary-50 tw-to-secondary-50 tw-mx-auto tw-max-w-2xl tw-rounded-2xl tw-border-2 tw-border-primary tw-bg-gradient-to-br tw-p-8 tw-text-center tw-shadow-2xl"
                >
                    <div className="tw-mb-4 tw-text-6xl">🎉</div>
                    <h3 className="tw-mb-4 tw-text-3xl tw-font-bold tw-text-primary">
                        Application Submitted!
                    </h3>
                    <p className="tw-text-lg tw-font-medium tw-text-secondary">{message}</p>
                    {showEmojiRain && <EmojiRain />}
                </motion.div>
            ) : (
                <>
                    <div className="tw-mb-8">
                        <h3 className="tw-mb-2 tw-text-center tw-text-3xl tw-font-bold tw-text-heading md:tw-text-left">
                            Application Form
                        </h3>
                        <p className="tw-text-center tw-text-gray-300 md:tw-text-left">
                            Complete all steps to submit your application
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="tw-mb-8">
                        <div className="tw-mb-4 tw-flex tw-flex-wrap tw-justify-between tw-gap-2">
                            {STEPS.map((step, index) => (
                                <div
                                    key={step.id}
                                    className="tw-flex tw-min-w-[80px] tw-flex-1 tw-flex-col tw-items-center"
                                >
                                    <div
                                        className={`tw-mb-2 tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-font-semibold tw-transition-all ${
                                            currentStep > index + 1
                                                ? "tw-bg-primary tw-text-white"
                                                : currentStep === index + 1
                                                  ? "tw-ring-secondary-200 tw-bg-secondary tw-text-white tw-ring-4"
                                                  : "tw-bg-gray-50 tw-text-gray-500"
                                        }`}
                                    >
                                        {currentStep > index + 1 ? "✓" : step.id}
                                    </div>
                                    <span
                                        className={`tw-text-center tw-text-xs tw-font-medium sm:tw-text-sm ${
                                            currentStep === index + 1
                                                ? "tw-text-secondary"
                                                : currentStep > index + 1
                                                  ? "tw-text-primary"
                                                  : "tw-text-gray-500"
                                        }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="tw-h-2 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-gray-50">
                            <motion.div
                                className="tw-h-full tw-bg-gradient-to-r tw-from-secondary tw-to-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <p className="tw-mt-2 tw-text-center tw-text-sm tw-font-semibold">
                            <span className="tw-text-secondary">Step {currentStep}</span>
                            <span className="tw-text-gray-500"> of </span>
                            <span className="tw-text-primary">{STEPS.length}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} noValidate>
                        <div className="tw-mx-auto tw-max-w-3xl tw-rounded-xl tw-bg-white tw-p-6 tw-shadow-xl md:tw-p-8">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Personal Info */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4 className="tw-mb-6 tw-text-2xl tw-font-semibold tw-text-heading">
                                            Personal Information
                                        </h4>
                                        <div className="tw-space-y-6">
                                            <div className="tw-grid tw-gap-6 md:tw-grid-cols-2">
                                                <div>
                                                    <label
                                                        htmlFor="firstName"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        First Name *
                                                    </label>
                                                    <Input
                                                        id="firstName"
                                                        placeholder="John"
                                                        bg="light"
                                                        feedbackText={errors?.firstName?.message}
                                                        state={
                                                            hasKey(errors, "firstName")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={!!hasKey(errors, "firstName")}
                                                        {...register("firstName", {
                                                            required: "First name is required",
                                                            minLength: {
                                                                value: 2,
                                                                message:
                                                                    "First name must be at least 2 characters",
                                                            },
                                                        })}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="lastName"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        Last Name *
                                                    </label>
                                                    <Input
                                                        id="lastName"
                                                        placeholder="Doe"
                                                        bg="light"
                                                        feedbackText={errors?.lastName?.message}
                                                        state={
                                                            hasKey(errors, "lastName")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={!!hasKey(errors, "lastName")}
                                                        {...register("lastName", {
                                                            required: "Last name is required",
                                                            minLength: {
                                                                value: 2,
                                                                message:
                                                                    "Last name must be at least 2 characters",
                                                            },
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                >
                                                    Email Address *
                                                </label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="john.doe@example.com"
                                                    bg="light"
                                                    feedbackText={errors?.email?.message}
                                                    state={
                                                        hasKey(errors, "email")
                                                            ? "error"
                                                            : "success"
                                                    }
                                                    showState={!!hasKey(errors, "email")}
                                                    {...register("email", {
                                                        required: "Email address is required",
                                                        validate: (value) => {
                                                            const result = validateEmail(value);
                                                            return (
                                                                result.isValid || result.error || ""
                                                            );
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Location */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4 className="tw-mb-6 tw-text-2xl tw-font-semibold tw-text-heading">
                                            Location Details
                                        </h4>
                                        <div className="tw-space-y-6">
                                            <div className="tw-grid tw-gap-6 md:tw-grid-cols-2">
                                                <div>
                                                    <label
                                                        htmlFor="city"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        City *
                                                    </label>
                                                    <Input
                                                        id="city"
                                                        placeholder="San Francisco"
                                                        bg="light"
                                                        feedbackText={errors?.city?.message}
                                                        state={
                                                            hasKey(errors, "city")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={!!hasKey(errors, "city")}
                                                        {...register("city", {
                                                            required: "City is required",
                                                        })}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="state"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        State/Province *
                                                    </label>
                                                    <Input
                                                        id="state"
                                                        placeholder="California"
                                                        bg="light"
                                                        feedbackText={errors?.state?.message}
                                                        state={
                                                            hasKey(errors, "state")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={!!hasKey(errors, "state")}
                                                        {...register("state", {
                                                            required: "State/Province is required",
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="tw-grid tw-gap-6 md:tw-grid-cols-2">
                                                <div>
                                                    <label
                                                        htmlFor="zipCode"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        Zip/Postal Code *
                                                    </label>
                                                    <Input
                                                        id="zipCode"
                                                        placeholder="94102"
                                                        bg="light"
                                                        feedbackText={errors?.zipCode?.message}
                                                        state={
                                                            hasKey(errors, "zipCode")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={!!hasKey(errors, "zipCode")}
                                                        {...register("zipCode", {
                                                            required: "Zip/Postal code is required",
                                                        })}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="country"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        Country *
                                                    </label>
                                                    <Input
                                                        id="country"
                                                        placeholder="United States"
                                                        bg="light"
                                                        feedbackText={errors?.country?.message}
                                                        state={
                                                            hasKey(errors, "country")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={!!hasKey(errors, "country")}
                                                        {...register("country", {
                                                            required: "Country is required",
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Military Background */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4 className="tw-mb-6 tw-text-2xl tw-font-semibold tw-text-heading">
                                            Military Background
                                        </h4>
                                        <div className="tw-space-y-6">
                                            <div>
                                                <label
                                                    htmlFor="branchOfService"
                                                    className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                >
                                                    Branch of Service *
                                                </label>
                                                <Input
                                                    id="branchOfService"
                                                    placeholder="e.g., Army, Navy, Air Force, Marines, Coast Guard"
                                                    bg="light"
                                                    feedbackText={errors?.branchOfService?.message}
                                                    state={
                                                        hasKey(errors, "branchOfService")
                                                            ? "error"
                                                            : "success"
                                                    }
                                                    showState={!!hasKey(errors, "branchOfService")}
                                                    {...register("branchOfService", {
                                                        required: "Branch of service is required",
                                                    })}
                                                />
                                            </div>
                                            <div className="tw-grid tw-gap-6 md:tw-grid-cols-2">
                                                <div>
                                                    <label
                                                        htmlFor="yearJoined"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        Year Joined *
                                                    </label>
                                                    <Input
                                                        id="yearJoined"
                                                        placeholder="e.g., 2010"
                                                        bg="light"
                                                        feedbackText={errors?.yearJoined?.message}
                                                        state={
                                                            hasKey(errors, "yearJoined")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={!!hasKey(errors, "yearJoined")}
                                                        {...register("yearJoined", {
                                                            required: "Year joined is required",
                                                            pattern: {
                                                                value: /^\d{4}$/,
                                                                message:
                                                                    "Please enter a valid year (e.g., 2010)",
                                                            },
                                                        })}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="yearSeparated"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        Year Separated *
                                                    </label>
                                                    <Input
                                                        id="yearSeparated"
                                                        placeholder="e.g., 2015"
                                                        bg="light"
                                                        feedbackText={
                                                            errors?.yearSeparated?.message
                                                        }
                                                        state={
                                                            hasKey(errors, "yearSeparated")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={
                                                            !!hasKey(errors, "yearSeparated")
                                                        }
                                                        {...register("yearSeparated", {
                                                            required: "Year separated is required",
                                                            pattern: {
                                                                value: /^\d{4}$/,
                                                                message:
                                                                    "Please enter a valid year (e.g., 2015)",
                                                            },
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Education History */}
                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4 className="tw-mb-6 tw-text-2xl tw-font-semibold tw-text-heading">
                                            Education History
                                        </h4>
                                        <div className="tw-space-y-6">
                                            <div className="tw-rounded-lg tw-bg-gray-50 tw-p-4">
                                                <Checkbox
                                                    label="Have you previously attended any coding bootcamps or tech education programs?"
                                                    id="hasAttendedPreviousCourse"
                                                    {...register("hasAttendedPreviousCourse")}
                                                />
                                            </div>
                                            {watchHasAttendedPreviousCourses && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <label
                                                        htmlFor="previousCourses"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        List previous courses/programs *
                                                    </label>
                                                    <TextArea
                                                        id="previousCourses"
                                                        placeholder="e.g., JavaScript Fundamentals, Python for Beginners, etc."
                                                        bg="light"
                                                        feedbackText={
                                                            errors?.previousCourses?.message
                                                        }
                                                        state={
                                                            hasKey(errors, "previousCourses")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={
                                                            !!hasKey(errors, "previousCourses")
                                                        }
                                                        {...register("previousCourses", {
                                                            required:
                                                                watchHasAttendedPreviousCourses
                                                                    ? "Please list your previous courses or uncheck the box"
                                                                    : false,
                                                        })}
                                                    />
                                                </motion.div>
                                            )}
                                            <div className="tw-rounded-lg tw-bg-gray-50 tw-p-4">
                                                <Checkbox
                                                    label="Will you be attending any other courses or programs concurrently with Vets Who Code?"
                                                    id="willAttendAnotherCourse"
                                                    {...register("willAttendAnotherCourse")}
                                                />
                                            </div>
                                            {watchWillAttendAnotherCourse && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <label
                                                        htmlFor="otherCourses"
                                                        className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                    >
                                                        List concurrent courses/programs *
                                                    </label>
                                                    <TextArea
                                                        id="otherCourses"
                                                        placeholder="e.g., Web Development Bootcamp, Data Science Course, etc."
                                                        bg="light"
                                                        feedbackText={errors?.otherCourses?.message}
                                                        state={
                                                            hasKey(errors, "otherCourses")
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        showState={!!hasKey(errors, "otherCourses")}
                                                        {...register("otherCourses", {
                                                            required: watchWillAttendAnotherCourse
                                                                ? "Please list concurrent courses or uncheck the box"
                                                                : false,
                                                        })}
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 5: Technical Profiles */}
                                {currentStep === 5 && (
                                    <motion.div
                                        key="step5"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4 className="tw-mb-6 tw-text-2xl tw-font-semibold tw-text-heading">
                                            Technical Profiles & Prework
                                        </h4>
                                        <div className="tw-space-y-6">
                                            <div>
                                                <label
                                                    htmlFor="linkedInAccountName"
                                                    className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                >
                                                    LinkedIn Profile URL *
                                                </label>
                                                <Input
                                                    id="linkedInAccountName"
                                                    placeholder="linkedin.com/in/your-name"
                                                    bg="light"
                                                    feedbackText={
                                                        errors?.linkedInAccountName?.message
                                                    }
                                                    state={
                                                        hasKey(errors, "linkedInAccountName")
                                                            ? "error"
                                                            : "success"
                                                    }
                                                    showState={
                                                        !!hasKey(errors, "linkedInAccountName")
                                                    }
                                                    {...register("linkedInAccountName", {
                                                        required:
                                                            "LinkedIn profile URL is required",
                                                        pattern: {
                                                            value: linkedinRegex,
                                                            message:
                                                                "Please enter a valid LinkedIn profile URL (e.g., linkedin.com/in/your-name)",
                                                        },
                                                    })}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="githubAccountName"
                                                    className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                >
                                                    GitHub Profile URL *
                                                </label>
                                                <Input
                                                    id="githubAccountName"
                                                    placeholder="github.com/your-username"
                                                    bg="light"
                                                    feedbackText={
                                                        errors?.githubAccountName?.message
                                                    }
                                                    state={
                                                        hasKey(errors, "githubAccountName")
                                                            ? "error"
                                                            : "success"
                                                    }
                                                    showState={
                                                        !!hasKey(errors, "githubAccountName")
                                                    }
                                                    {...register("githubAccountName", {
                                                        required: "GitHub profile URL is required",
                                                        pattern: {
                                                            value: githubRegex,
                                                            message:
                                                                "Please enter a valid GitHub profile URL (e.g., github.com/your-username)",
                                                        },
                                                    })}
                                                />
                                            </div>
                                            <div className="tw-rounded-lg tw-border-2 tw-border-blue-200 tw-bg-navy-sky/20 tw-p-4">
                                                <h5 className="tw-mb-3 tw-text-lg tw-font-semibold tw-text-blue-900">
                                                    Prework Submission
                                                </h5>
                                                <p className="tw-mb-4 tw-text-sm tw-text-blue-800">
                                                    Your prework demonstrates your commitment and
                                                    foundational skills. Please provide both the
                                                    live deployment link and the GitHub repository.
                                                </p>
                                                <div className="tw-space-y-4">
                                                    <div>
                                                        <label
                                                            htmlFor="preworkLink"
                                                            className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                        >
                                                            Prework Live Link *
                                                        </label>
                                                        <Input
                                                            id="preworkLink"
                                                            placeholder="https://your-username.github.io/prework"
                                                            bg="light"
                                                            feedbackText={
                                                                errors?.preworkLink?.message
                                                            }
                                                            state={
                                                                hasKey(errors, "preworkLink")
                                                                    ? "error"
                                                                    : "success"
                                                            }
                                                            showState={
                                                                !!hasKey(errors, "preworkLink")
                                                            }
                                                            {...register("preworkLink", {
                                                                required:
                                                                    "Prework live link is required",
                                                                pattern: {
                                                                    value: /^https?:\/\/.+/,
                                                                    message:
                                                                        "Please enter a valid URL (starting with http:// or https://)",
                                                                },
                                                            })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="preworkRepo"
                                                            className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-heading"
                                                        >
                                                            Prework Repository URL *
                                                        </label>
                                                        <Input
                                                            id="preworkRepo"
                                                            placeholder="https://github.com/your-username/prework"
                                                            bg="light"
                                                            feedbackText={
                                                                errors?.preworkRepo?.message
                                                            }
                                                            state={
                                                                hasKey(errors, "preworkRepo")
                                                                    ? "error"
                                                                    : "success"
                                                            }
                                                            showState={
                                                                !!hasKey(errors, "preworkRepo")
                                                            }
                                                            {...register("preworkRepo", {
                                                                required:
                                                                    "Prework repository URL is required",
                                                                pattern: {
                                                                    value: /^https?:\/\/(www\.)?github\.com\/.+/,
                                                                    message:
                                                                        "Please enter a valid GitHub repository URL",
                                                                },
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="tw-mt-8 tw-flex tw-flex-col tw-gap-4 tw-border-t tw-border-gray-200 tw-pt-6 sm:tw-flex-row sm:tw-justify-between">
                                <Button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={`tw-w-full sm:tw-w-auto ${
                                        currentStep === 1 ? "tw-invisible" : ""
                                    }`}
                                    color="light"
                                >
                                    ← Previous
                                </Button>
                                {currentStep < STEPS.length ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="tw-w-full sm:tw-w-auto"
                                    >
                                        Next →
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="tw-w-full sm:tw-w-auto"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Application"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default ApplyForm;
