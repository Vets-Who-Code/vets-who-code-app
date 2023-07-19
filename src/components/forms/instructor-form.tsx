import { useState } from "react";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import Alert from "@ui/alert";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import Input from "@ui/form-elements/input";
import Textarea from "@ui/form-elements/textarea";
import Feedback from "@ui/form-elements/feedback";
import { hasKey } from "@utils/methods";
import axios from "axios";

type TProps = {
    className?: string;
};

interface IFormValues {
    name: string;
    email: string;
    "branch-of-service": string;
    "technical-expertise": string;
    "github-portfolio-or-linkedin": string;
    location: string;
    "employer-restrictions": string;
}

const InstructorForm = ({ className }: TProps) => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            const response = await axios.post("/api/mentor", data);
            if (response.status === 200) {
                setMessage("Thank you for your message!");
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to submit the form. Please try again.");
        }
    };

    return (
        <div
            className={clsx(
                "tw-bg-white tw-rounded tw-py-7.5 tw-px-3.8 sm:tw-pt-14 sm:tw-pb-15 sm:tw-px-[50px] tw-shadow-2md tw-shadow-black/10",
                className
            )}
        >
            <h4 className="tw-text-[28px] tw-mb-5 sm:tw-text-[34px] sm:tw-mb-9 tw-leading-snug tw-text-center">
                Register to become a Mentor
            </h4>
            <form
                className="become-teacher-form tw-flex tw-flex-col tw-items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Alert className="tw-mb-5">
                    <i className="far fa-exclamation-circle" />
                    Please <Anchor path="/login-register">login</Anchor> to send
                    your request!
                </Alert>
                <div className="tw-grid md:tw-grid-cols-2 md:tw-gap-7.5 tw-items-center tw-flex-wrap tw-justify-center">
                    <div className="tw-mb-3.8">
                        <label htmlFor="name" className="tw-sr-only">
                            Name
                        </label>
                        <Input
                            id="name"
                            placeholder="Your Name *"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={!!hasKey(errors, "name")}
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                    </div>
                    <div className="tw-mb-3.8">
                        <label htmlFor="email" className="tw-sr-only">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Email *"
                            feedbackText={errors?.email?.message}
                            state={
                                hasKey(errors, "email") ? "error" : "success"
                            }
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
                    <div className="tw-mb-3.8">
                        <label
                            htmlFor="branch-of-service"
                            className="tw-sr-only"
                        >
                            Branch of Service
                        </label>
                        <Input
                            id="branch-of-service"
                            placeholder="Branch of Service *"
                            feedbackText={
                                errors?.["branch-of-service"]?.message
                            }
                            state={
                                hasKey(errors, "branch-of-service")
                                    ? "error"
                                    : "success"
                            }
                            showState={!!hasKey(errors, "branch-of-service")}
                            {...register("branch-of-service", {
                                required: "Branch of Service is required",
                            })}
                        />
                    </div>
                    <div className="tw-mb-3.8">
                        <label
                            htmlFor="technical-expertise"
                            className="tw-sr-only"
                        >
                            Technical Expertise
                        </label>
                        <Input
                            id="technical-expertise"
                            placeholder="Technical Expertise *"
                            feedbackText={
                                errors?.["technical-expertise"]?.message
                            }
                            state={
                                hasKey(errors, "technical-expertise")
                                    ? "error"
                                    : "success"
                            }
                            showState={!!hasKey(errors, "technical-expertise")}
                            {...register("technical-expertise", {
                                required: "Technical Expertise is required",
                            })}
                        />
                    </div>
                    <div className="tw-mb-3.8">
                        <label
                            htmlFor="github-portfolio-or-linkedin"
                            className="tw-sr-only"
                        >
                            GitHub Portfolio or LinkedIn
                        </label>
                        <Input
                            id="github-portfolio-or-linkedin"
                            placeholder="GitHub Portfolio or LinkedIn *"
                            feedbackText={
                                errors?.["github-portfolio-or-linkedin"]
                                    ?.message
                            }
                            state={
                                hasKey(errors, "github-portfolio-or-linkedin")
                                    ? "error"
                                    : "success"
                            }
                            showState={
                                !!hasKey(errors, "github-portfolio-or-linkedin")
                            }
                            {...register("github-portfolio-or-linkedin", {
                                required:
                                    "GitHub Portfolio or LinkedIn is required",
                            })}
                        />
                    </div>
                    <div className="tw-mb-3.8">
                        <label htmlFor="location" className="tw-sr-only">
                            Location
                        </label>
                        <Input
                            id="location"
                            placeholder="Location *"
                            feedbackText={errors?.location?.message}
                            state={
                                hasKey(errors, "location") ? "error" : "success"
                            }
                            showState={!!hasKey(errors, "location")}
                            {...register("location", {
                                required: "Location is required",
                            })}
                        />
                    </div>
                    <div className="tw-mb-3.8">
                        <label
                            htmlFor="employer-restrictions"
                            className="tw-sr-only"
                        >
                            Employer Restrictions
                        </label>
                        <Input
                            id="employer-restrictions"
                            placeholder="Employer Restrictions *"
                            feedbackText={
                                errors?.["employer-restrictions"]?.message
                            }
                            state={
                                hasKey(errors, "employer-restrictions")
                                    ? "error"
                                    : "success"
                            }
                            showState={
                                !!hasKey(errors, "employer-restrictions")
                            }
                            {...register("employer-restrictions", {
                                required: "Employer Restrictions is required",
                            })}
                        />
                    </div>
                </div>

                <div className="tw-text-center">
                    <Button type="submit">Get the learning program</Button>
                    {message && <Feedback state="success">{message}</Feedback>}
                </div>
            </form>
        </div>
    );
};

export default InstructorForm;
