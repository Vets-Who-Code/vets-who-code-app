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

type TProps = {
    className?: string;
};

interface IFormValues {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const InstructorForm = ({ className }: TProps) => {
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
        <div
            className={clsx(
                "tw-bg-white tw-rounded tw-py-7.5 tw-px-3.8 sm:tw-pt-14 sm:tw-pb-15 sm:tw-px-[50px] tw-shadow-2md tw-shadow-black/10",
                className
            )}
        >
            <h4 className="tw-text-[28px] tw-mb-5 sm:tw-text-[34px] sm:tw-mb-9 tw-leading-snug tw-text-center">
                Register to become an Intructor
            </h4>
            <form
                className="become-teacher-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Alert className="tw-mb-5">
                    <i className="far fa-exclamation-circle" />
                    Please <Anchor path="/login-register">login</Anchor> to send
                    your request!
                </Alert>
                <div className="tw-grid md:tw-grid-cols-2 md:tw-gap-7.5">
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
                                    message: "invalid email address",
                                },
                            })}
                        />
                    </div>
                </div>
                <div className="tw-mb-3.8">
                    <label htmlFor="phone" className="tw-sr-only">
                        Phone
                    </label>
                    <Input
                        id="phone"
                        placeholder="Your phone number"
                        feedbackText={errors?.phone?.message}
                        state={hasKey(errors, "phone") ? "error" : "success"}
                        showState={!!hasKey(errors, "phone")}
                        {...register("phone", {
                            required: "Phone is required",
                        })}
                    />
                </div>
                <div className="tw-mb-5">
                    <label htmlFor="message" className="tw-sr-only">
                        Message
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Your Message"
                        feedbackText={errors?.message?.message}
                        state={hasKey(errors, "message") ? "error" : "success"}
                        showState={!!hasKey(errors, "message")}
                        {...register("message", {
                            required: "Message is required",
                        })}
                    />
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
