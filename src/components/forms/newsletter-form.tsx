import { forwardRef, useState } from "react";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Feedback from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import { ApiResponse, FetchError } from "@utils/types";
import { validateEmail } from "@utils/validators";

type TProps = {
    className?: string;
};

type IFormValues = {
    newsletter_email: string;
};

const NewsletterForm = forwardRef<HTMLFormElement, TProps>(({ className }, ref) => {
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (formData, e) => {
        e?.preventDefault();

        try {
            const subscribApiEndpoint = "/api/newsletter";
            const options = {
                method: "POST",
                body: JSON.stringify(formData),
            };

            const response: Response = await fetch(subscribApiEndpoint, options);
            const json = (await response.json()) as ApiResponse;

            if (json.ok) {
                setMessage("Thank you for subscribing!");
                setErrorMessage("");
                reset();
            } else if (!json.ok) {
                setMessage("");
                setErrorMessage(json.error || "OOPS Something went wrong");
            }
        } catch (error: unknown) {
            setMessage("");
            setErrorMessage((error as FetchError).message || "OOPS Something went wrong");
        }
    };

    return (
        <form
            className={clsx("tw-relative tw-flex tw-max-w-[570px] tw-flex-wrap", className)}
            onSubmit={handleSubmit(onSubmit)}
            ref={ref}
        >
            <div className="tw-flex-100 md:tw-flex-auto0">
                <label htmlFor="newsletter_email" className="tw-sr-only">
                    Newsletter
                </label>
                <Input
                    id="newsletter_email"
                    type="email"
                    placeholder="Your E-mail"
                    className="tw-max-h-[52px] md:tw-rounded-br-none md:tw-rounded-tr-none md:tw-border-r-0"
                    feedbackText={errors?.newsletter_email?.message}
                    state={hasKey(errors, "newsletter_email") ? "error" : "success"}
                    showState={!!hasKey(errors, "newsletter_email")}
                    {...register("newsletter_email", {
                        validate: (value) => {
                            const result = validateEmail(value);
                            return result.isValid || result.error || "";
                        },
                    })}
                    onChange={() => {
                        setErrorMessage("");
                        setMessage("");
                    }}
                />
            </div>
            <Button
                type="submit"
                className="tw-mt-3.8 md:tw-mt-0 md:tw-rounded-bl-none md:tw-rounded-tl-none"
            >
                Subscribe
            </Button>
            {message && <Feedback state="success">{message}</Feedback>}
            {errorMessage && <Feedback state="error">{errorMessage}</Feedback>}
        </form>
    );
});

export default NewsletterForm;
