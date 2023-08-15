import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Input from "@ui/form-elements/input";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";

interface IFormValues {
    name: string;
    email: string;
    "branch-of-service": string;
    "technical-expertise": string;
    "github-portfolio-or-linkedin": string;
    location: string;
    "employer-restrictions": string;
}

const MentorForm = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (data, { reset }) => {
        try {
            await axios.post("/api/mentor", data);
            setMessage("Thank you for your registration!");
            reset?.();
        } catch (error) {
            setMessage("Failed to submit the form. Please try again later.");
        }
    };

    return (
        <div className="tw-px-[50px]">
            <h3 className="tw-text-h2 tw-mb-5">Register</h3>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="name"
                        className="tw-text-heading tw-text-md"
                    >
                        Name *
                    </label>
                    <Input
                        id="name"
                        placeholder="Jody Grinder"
                        feedbackText={errors?.name?.message}
                        state={hasKey(errors, "name") ? "error" : "success"}
                        showState={!!hasKey(errors, "name")}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="email"
                        className="tw-text-heading tw-text-md"
                    >
                        Email *
                    </label>
                    <Input
                        id="email"
                        placeholder="jody@civilian.com"
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
                    <label
                        htmlFor="branch-of-service"
                        className="tw-text-heading tw-text-md"
                    >
                        Military Branch Affiliation *
                    </label>
                    <Input
                        id="branch-of-service"
                        placeholder="Civilian"
                        feedbackText={errors?.["branch-of-service"]?.message}
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
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="technical-expertise"
                        className="tw-text-heading tw-text-md"
                    >
                        Technical Expertise *
                    </label>
                    <Input
                        id="technical-expertise"
                        placeholder="Javascript, React, Node, etc."
                        feedbackText={errors?.["technical-expertise"]?.message}
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
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="github-portfolio-or-linkedin"
                        className="tw-text-heading tw-text-md"
                    >
                        GitHub Portfolio or LinkedIn *
                    </label>
                    <Input
                        id="github-portfolio-or-linkedin"
                        placeholder="github.com/jody-fake-profile"
                        feedbackText={
                            errors?.["github-portfolio-or-linkedin"]?.message
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
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="location"
                        className="tw-text-heading tw-text-md"
                    >
                        Location *
                    </label>
                    <Input
                        id="location"
                        placeholder="Washington, DC"
                        feedbackText={errors?.location?.message}
                        state={hasKey(errors, "location") ? "error" : "success"}
                        showState={!!hasKey(errors, "location")}
                        {...register("location", {
                            required: "Location is required",
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="employer-restrictions"
                        className="tw-text-heading tw-text-md"
                    >
                        Employer Restrictions *
                    </label>
                    <Input
                        id="employer-restrictions"
                        placeholder="None"
                        feedbackText={
                            errors?.["employer-restrictions"]?.message
                        }
                        state={
                            hasKey(errors, "employer-restrictions")
                                ? "error"
                                : "success"
                        }
                        showState={!!hasKey(errors, "employer-restrictions")}
                        {...register("employer-restrictions", {
                            required: "Employer Restrictions is required",
                        })}
                    />
                </div>

                <Button type="submit" fullwidth className="tw-mt-7.5">
                    Register
                </Button>
            </form>
        </div>
    );
};

export default MentorForm;
