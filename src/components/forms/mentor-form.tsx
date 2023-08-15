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
        reset,
    } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            await axios.post("/api/mentor", data);
            setMessage("Thank you for your registration!");
            reset();
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
                        {...register("name", { required: "Name is required" })}
                    />
                </div>
                {/* Rest of the form code */}
                <Button type="submit" fullwidth className="tw-mt-7.5">
                    Register
                </Button>
            </form>
        </div>
    );
};

export default MentorForm;
