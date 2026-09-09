import Button from "@ui/button";
import Feedback from "@ui/form-elements/feedback";
import { hasKey } from "@utils/methods";
import {
    type ValidationResult,
    validateEmail,
    validatePhone,
    validateRequired,
} from "@utils/validators";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ROLES = ["Applicant", "Partner", "Press"] as const;
type Role = (typeof ROLES)[number];

const REASONS = [
    "Applying to the program",
    "Mentoring or volunteering",
    "Hiring our troops",
    "Corporate partnership",
    "Donations and sponsorship",
    "Press and media",
    "Something else",
];

interface IFormValues {
    /** Honeypot. Any value means a bot filled a field humans never see. */
    website: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    reason: string;
    message: string;
}

// The Input primitive bakes in tw-rounded, a fixed height and gray borders. This page
// is zero-radius with a navy border and a gold focus ring, so the fields are plain.
const FIELD =
    "tw-block tw-w-full tw-border tw-border-navy tw-bg-white tw-px-4 tw-py-[13px] tw-font-body tw-text-base tw-text-navy tw-rounded-none placeholder:tw-text-gray-200 focus:tw-outline focus:tw-outline-[3px] focus:tw-outline-offset-2 focus:tw-outline-gold";
const LABEL = "tw-mb-2 tw-block tw-font-heading tw-text-[13px] tw-font-medium tw-text-navy";
const MONO_LABEL = "tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-gray-300";

type TProps = { heading?: string };

const ContactUsForm = ({ heading }: TProps) => {
    const [role, setRole] = useState<Role>("Applicant");
    const [serverMessage, setServerMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            const response = await axios.post("/api/contact", { ...data, role });
            if (response.status === 200) {
                setServerMessage("Thank you for your message!");
                reset();
                setRole("Applicant");
            } else {
                setServerMessage("There was an error. Please try again later.");
            }
        } catch {
            setServerMessage("There was an error. Please try again later.");
        }
    };

    const fieldState = (key: keyof IFormValues) => (hasKey(errors, key) ? "error" : "success");

    // The repo validators return { isValid, error }; react-hook-form wants true | string.
    const check = (result: ValidationResult) => (result.isValid ? true : result.error || "");

    return (
        <div className="tw-border tw-border-gray-100 tw-bg-white tw-p-6 tw-shadow-[0_4px_12px_rgba(9,31,64,0.05)] md:tw-p-10">
            {heading && (
                <h2 className="tw-mb-7 tw-font-heading tw-font-bold tw-leading-[1.25] tw-text-navy [font-size:clamp(18px,2.2vw,22px)]">
                    {heading}
                </h2>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="tw-flex tw-flex-col tw-gap-[22px]">
                {/*
                    Honeypot, positioned off-screen rather than display:none — some bots
                    skip undisplayed inputs but fill positioned ones. The API drops any
                    submission that fills it.
                */}
                <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        width: "1px",
                        height: "1px",
                        opacity: 0,
                    }}
                    {...register("website")}
                />

                <fieldset className="tw-m-0 tw-border-0 tw-p-0">
                    <legend className={clsx(MONO_LABEL, "tw-mb-2.5 tw-p-0")}>I am a</legend>
                    <div className="tw-flex tw-flex-wrap tw-border tw-border-navy">
                        {ROLES.map((option) => (
                            <button
                                key={option}
                                type="button"
                                aria-pressed={role === option}
                                onClick={() => setRole(option)}
                                className={clsx(
                                    "tw-min-h-[44px] tw-flex-[1_1_100px] tw-px-[18px] tw-py-3 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-transition-colors tw-duration-200",
                                    role === option
                                        ? "tw-bg-navy tw-text-white"
                                        : "tw-bg-white tw-text-gray-300"
                                )}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </fieldset>

                <div className="tw-grid tw-grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] tw-gap-[22px]">
                    <div>
                        <label htmlFor="name" className={LABEL}>
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name *"
                            className={FIELD}
                            {...register("name", {
                                validate: (value) => check(validateRequired(value, "Name")),
                            })}
                        />
                        {hasKey(errors, "name") && (
                            <Feedback state={fieldState("name")}>{errors.name?.message}</Feedback>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className={LABEL}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your Email *"
                            className={FIELD}
                            {...register("email", {
                                validate: (value) => check(validateEmail(value)),
                            })}
                        />
                        {hasKey(errors, "email") && (
                            <Feedback state={fieldState("email")}>{errors.email?.message}</Feedback>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phone" className={LABEL}>
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Your Phone"
                            className={FIELD}
                            {...register("phone", {
                                // Optional on this page, so only validate what was typed.
                                validate: (value) => (value ? check(validatePhone(value)) : true),
                            })}
                        />
                        {hasKey(errors, "phone") && (
                            <Feedback state={fieldState("phone")}>{errors.phone?.message}</Feedback>
                        )}
                    </div>

                    <div>
                        <label htmlFor="subject" className={LABEL}>
                            Subject
                        </label>
                        <input
                            id="subject"
                            type="text"
                            placeholder="Subject *"
                            className={FIELD}
                            {...register("subject", {
                                validate: (value) => check(validateRequired(value, "Subject")),
                            })}
                        />
                        {hasKey(errors, "subject") && (
                            <Feedback state={fieldState("subject")}>
                                {errors.subject?.message}
                            </Feedback>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="reason" className={LABEL}>
                        Reason for reaching out
                    </label>
                    <select
                        id="reason"
                        className={FIELD}
                        defaultValue=""
                        {...register("reason", {
                            validate: (value) => check(validateRequired(value, "Reason")),
                        })}
                    >
                        <option value="">Select one</option>
                        {REASONS.map((reason) => (
                            <option key={reason} value={reason}>
                                {reason}
                            </option>
                        ))}
                    </select>
                    {hasKey(errors, "reason") && (
                        <Feedback state={fieldState("reason")}>{errors.reason?.message}</Feedback>
                    )}
                </div>

                <div>
                    <label htmlFor="message" className={LABEL}>
                        Message
                    </label>
                    <textarea
                        id="message"
                        rows={6}
                        placeholder="Message"
                        className={clsx(FIELD, "tw-resize-y tw-leading-[1.6]")}
                        {...register("message", {
                            validate: (value) => check(validateRequired(value, "Message")),
                        })}
                    />
                    {hasKey(errors, "message") && (
                        <Feedback state={fieldState("message")}>{errors.message?.message}</Feedback>
                    )}
                </div>

                <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-5">
                    <Button type="submit" color="primary" size="md" disabled={isSubmitting}>
                        Send Message
                    </Button>
                    <span className={MONO_LABEL}>Required fields marked *</span>
                </div>

                {serverMessage && (
                    <p className="tw-m-0 tw-font-body tw-text-base tw-text-navy">{serverMessage}</p>
                )}
            </form>
        </div>
    );
};

export default ContactUsForm;
