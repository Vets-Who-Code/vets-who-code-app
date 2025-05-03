import EmojiRain from "@components/EmojiRain";
import { useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import axios from "axios";
import Input from "@ui/form-elements/input";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import Feedback from "@ui/form-elements/feedback";
import { validateProfileLink } from "@utils/formValidations";

interface IBaseFormValues {
    name: string;
    email: string;
    "branch-of-service": string;
    "github-portfolio-or-linkedin": string;
    location: string;
}

interface IMentorFormValues extends IBaseFormValues {
    "technical-expertise": string;
    "employer-restrictions": string;
}

interface IMenteeFormValues extends IBaseFormValues {
    "desired-skills": string;
    "career-goals": string;
    availability: string;
}

type IFormValues = IMentorFormValues | IMenteeFormValues;

const MentorMenteeForm = () => {
    const [message, setMessage] = useState("");
    const [showEmojiRain, setShowEmojiRain] = useState<boolean>(false);
    const [role, setRole] = useState<"mentor" | "mentee">("mentor");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            // Add the role to the data
            const submissionData = {
                ...data,
                role,
            };

            // Use the same endpoint for both mentors and mentees
            const endpoint = role === "mentor" ? "/api/mentor" : "/api/mentee";
            await axios.post(endpoint, submissionData);

            setMessage(`Thank you for registering as a ${role}!`);
            setShowEmojiRain(true);

            setTimeout(() => setShowEmojiRain(false), 5000);

            reset();
        } catch (error) {
            setMessage("Failed to submit the form. Please try again later.");
        }
    };

    const handleRoleChange = (newRole: "mentor" | "mentee") => {
        setRole(newRole);
        // Clear form when switching roles
        reset();
    };

    return (
        <div className="tw-px-4 md:tw-px-[250px]">
            <h3 className="tw-mb-5 tw-text-h2">Register</h3>

            {/* Role selection */}
            <div className="tw-mb-7.5 tw-flex tw-gap-4">
                <Button
                    onClick={() => handleRoleChange("mentor")}
                    className={`tw-flex-1 ${role === "mentor" ? "" : "tw-bg-gray-300 tw-text-gray-700"}`}
                >
                    Register as Mentor
                </Button>
                <Button
                    onClick={() => handleRoleChange("mentee")}
                    className={`tw-flex-1 ${role === "mentee" ? "" : "tw-bg-gray-300 tw-text-gray-700"}`}
                >
                    Register as Mentee
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Common Fields for Both Roles */}
                <div className="tw-mb-7.5">
                    <label htmlFor="name" className="tw-text-md tw-text-heading">
                        Name *
                    </label>
                    <Input
                        id="name"
                        placeholder="Jody Grinder"
                        bg="light"
                        feedbackText={errors?.name?.message}
                        state={hasKey(errors, "name") ? "error" : "success"}
                        showState={!!hasKey(errors, "name")}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label htmlFor="email" className="tw-text-md tw-text-heading">
                        Email *
                    </label>
                    <Input
                        id="email"
                        placeholder="jody@civilian.com"
                        bg="light"
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
                        showState={!!hasKey(errors, "email")}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label htmlFor="branch-of-service" className="tw-text-md tw-text-heading">
                        Military Branch Affiliation *
                    </label>
                    <Input
                        id="branch-of-service"
                        placeholder="Civilian"
                        bg="light"
                        feedbackText={errors?.["branch-of-service"]?.message}
                        state={hasKey(errors, "branch-of-service") ? "error" : "success"}
                        showState={!!hasKey(errors, "branch-of-service")}
                        {...register("branch-of-service", {
                            required: "Branch of Service is required",
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="github-portfolio-or-linkedin"
                        className="tw-text-md tw-text-heading"
                    >
                        GitHub Portfolio or LinkedIn *
                    </label>
                    <Input
                        id="github-portfolio-or-linkedin"
                        placeholder="github.com/jody-fake-profile"
                        bg="light"
                        feedbackText={errors?.["github-portfolio-or-linkedin"]?.message}
                        state={hasKey(errors, "github-portfolio-or-linkedin") ? "error" : "success"}
                        showState={!!hasKey(errors, "github-portfolio-or-linkedin")}
                        {...register("github-portfolio-or-linkedin", {
                            required: "GitHub Portfolio or LinkedIn is required",
                            validate: validateProfileLink,
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label htmlFor="location" className="tw-text-md tw-text-heading">
                        Location *
                    </label>
                    <Input
                        id="location"
                        placeholder="Washington, DC"
                        bg="light"
                        feedbackText={errors?.location?.message}
                        state={hasKey(errors, "location") ? "error" : "success"}
                        showState={!!hasKey(errors, "location")}
                        {...register("location", {
                            required: "Location is required",
                        })}
                    />
                </div>

                {/* Mentor-Specific Fields */}
                {role === "mentor" && (
                    <>
                        <div className="tw-mb-7.5">
                            <label
                                htmlFor="technical-expertise"
                                className="tw-text-md tw-text-heading"
                            >
                                Technical Expertise *
                            </label>
                            <Input
                                id="technical-expertise"
                                placeholder="Javascript, React, Node, etc."
                                bg="light"
                                feedbackText={
                                    (errors as FieldErrors<IMentorFormValues>)?.[
                                        "technical-expertise"
                                    ]?.message
                                }
                                state={hasKey(errors, "technical-expertise") ? "error" : "success"}
                                showState={!!hasKey(errors, "technical-expertise")}
                                {...register("technical-expertise" as any, {
                                    required: "Technical Expertise is required",
                                })}
                            />
                        </div>
                        <div className="tw-mb-7.5">
                            <label
                                htmlFor="employer-restrictions"
                                className="tw-text-md tw-text-heading"
                            >
                                Employer Restrictions *
                            </label>
                            <Input
                                id="employer-restrictions"
                                placeholder="None"
                                bg="light"
                                feedbackText={
                                    (errors as FieldErrors<IMentorFormValues>)?.[
                                        "employer-restrictions"
                                    ]?.message
                                }
                                state={
                                    hasKey(errors, "employer-restrictions") ? "error" : "success"
                                }
                                showState={!!hasKey(errors, "employer-restrictions")}
                                {...register("employer-restrictions" as any, {
                                    required: "Employer Restrictions is required",
                                })}
                            />
                        </div>
                    </>
                )}

                {/* Mentee-Specific Fields */}
                {role === "mentee" && (
                    <>
                        <div className="tw-mb-7.5">
                            <label htmlFor="desired-skills" className="tw-text-md tw-text-heading">
                                Desired Skills to Learn *
                            </label>
                            <Input
                                id="desired-skills"
                                placeholder="Javascript, React, Node, etc."
                                bg="light"
                                feedbackText={
                                    (errors as FieldErrors<IMenteeFormValues>)?.["desired-skills"]
                                        ?.message
                                }
                                state={hasKey(errors, "desired-skills") ? "error" : "success"}
                                showState={!!hasKey(errors, "desired-skills")}
                                {...register("desired-skills" as any, {
                                    required: "Desired Skills is required",
                                })}
                            />
                        </div>
                        <div className="tw-mb-7.5">
                            <label htmlFor="career-goals" className="tw-text-md tw-text-heading">
                                Career Goals *
                            </label>
                            <Input
                                id="career-goals"
                                placeholder="Frontend Developer, Full Stack Engineer, etc."
                                bg="light"
                                feedbackText={
                                    (errors as FieldErrors<IMenteeFormValues>)?.["career-goals"]
                                        ?.message
                                }
                                state={hasKey(errors, "career-goals") ? "error" : "success"}
                                showState={!!hasKey(errors, "career-goals")}
                                {...register("career-goals" as any, {
                                    required: "Career Goals is required",
                                })}
                            />
                        </div>
                        <div className="tw-mb-7.5">
                            <label htmlFor="availability" className="tw-text-md tw-text-heading">
                                Availability *
                            </label>
                            <Input
                                id="availability"
                                placeholder="Evenings, Weekends, etc."
                                bg="light"
                                feedbackText={
                                    role === "mentee" && "availability" in errors
                                        ? errors.availability?.message
                                        : undefined
                                }
                                state={hasKey(errors, "availability") ? "error" : "success"}
                                showState={!!hasKey(errors, "availability")}
                                {...register("availability" as any, {
                                    required: "Availability is required",
                                })}
                            />
                        </div>
                    </>
                )}

                <Button
                    type="submit"
                    fullwidth
                    className="tw-mx-auto tw-mt-7.5 tw-w-full sm:tw-w-[200px]"
                >
                    Register as {role === "mentor" ? "Mentor" : "Mentee"}
                </Button>
                {message && <Feedback state="success">{message}</Feedback>}
                {showEmojiRain && <EmojiRain />}
            </form>
        </div>
    );
};

export default MentorMenteeForm;
