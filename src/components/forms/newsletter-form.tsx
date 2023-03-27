import { forwardRef, useState } from "react";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Feedback from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";

type TProps = {
    className?: string;
};

interface IFormValues {
    newsletter_email: string;
}

const NewsletterForm = forwardRef<HTMLFormElement, TProps>(
    ({ className }, ref) => {
        const [message, setMessage] = useState("");
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<IFormValues>();

        const onSubmit: SubmitHandler<IFormValues> = (data) => {
            // eslint-disable-next-line no-console
            console.log(data);
            setMessage("Thank you for your message!");
        };
        return (
            <form
                className={clsx(
                    "tw-relative tw-max-w-[570px] tw-flex tw-flex-wrap",
                    className
                )}
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
                        state={
                            hasKey(errors, "newsletter_email")
                                ? "error"
                                : "success"
                        }
                        showState={!!hasKey(errors, "newsletter_email")}
                        {...register("newsletter_email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />
                </div>
                <Button
                    type="submit"
                    className="tw-mt-3.8 md:tw-mt-0 md:tw-rounded-bl-none md:tw-rounded-tl-none"
                >
                    Subscribe
                </Button>
                {message && <Feedback state="success">{message}</Feedback>}
            </form>
        );
    }
);

export default NewsletterForm;
