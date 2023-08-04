import { useState } from "react";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Textarea from "@ui/form-elements/textarea";
import Checkbox from "@ui/form-elements/checkbox";
import Feedback from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";

interface IFormValues {
    name: string;
    email: string;
    comment: string;
    terms: boolean;
}

const CommentForm = ({ className }: { className?: string }) => {
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
            className={clsx("tw-max-w-[770px] tw-mx-auto", className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="tw-grid sm:tw-grid-cols-2 tw-gap-5 tw-mb-5 lg:tw-gap-7.5 lg:tw-mb-7.5">
                <div>
                    <label htmlFor="name" className="tw-sr-only">
                        Name
                    </label>
                    <Input
                        id="name"
                        placeholder="Your Name *"
                        bg="light"
                        feedbackText={errors?.name?.message}
                        state={hasKey(errors, "name") ? "error" : "success"}
                        showState={!!hasKey(errors, "name")}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="tw-sr-only">
                        email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Your Email *"
                        bg="light"
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
                        showState={!!hasKey(errors, "email")}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />
                </div>
            </div>
            <div className="tw-mb-5 lg:tw-mb-7.5">
                <label htmlFor="comment" className="tw-sr-only">
                    comment
                </label>
                <Textarea
                    id="comment"
                    placeholder="Your Comment *"
                    bg="light"
                    feedbackText={errors?.comment?.message}
                    state={hasKey(errors, "comment") ? "error" : "success"}
                    showState={!!hasKey(errors, "comment")}
                    {...register("comment", {
                        required: "Comment is required",
                    })}
                />
            </div>
            <Checkbox
                className="tw-mx-auto"
                id="terms"
                label="Save my name, email, and website in this browser for the next time I comment."
                feedbackText={errors?.terms?.message}
                state={hasKey(errors, "terms") ? "error" : "success"}
                showState={!!hasKey(errors, "terms")}
                {...register("terms")}
            />
            <div className="tw-mt-5 lgtw-mt-7.5 tw-text-center">
                <Button type="submit" className="tw-w-[180px]">
                    Submit
                </Button>
                {message && <Feedback state="success">{message}</Feedback>}
            </div>
        </form>
    );
};

export default CommentForm;
