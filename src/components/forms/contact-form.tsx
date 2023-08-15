import React, { forwardRef, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Textarea from "@ui/form-elements/textarea";
import Feedback from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";

interface IFormValues {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}

interface TProps {
    className?: string;
}

const ContactForm = forwardRef<HTMLFormElement, TProps>(
    ({ className }, ref) => {
        const [serverMessage, setServerMessage] = useState<string>("");

        const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
        } = useForm<IFormValues>();

        const onSubmit: SubmitHandler<IFormValues> = async (data) => {
            try {
                const response = await axios.post("/api/contact", data);
                if (response.status === 200) {
                    setServerMessage("Thank you for your message!");
                    reset();
                } else {
                    setServerMessage(
                        "There was an error. Please try again later."
                    );
                }
            } catch (error) {
                setServerMessage("There was an error. Please try again later.");
            }
        };

        return (
            <form
                className={clsx(className)}
                ref={ref}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="tw-grid tw-grid-cols-1 tw-gap-5 tw-mb-5 md:tw-grid-cols-2 md:tw-gap-7.5 md:tw-mb-7.5">
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
                        <label htmlFor="phone" className="tw-sr-only">
                            Phone
                        </label>
                        <Input
                            id="phone"
                            placeholder="Your Phone *"
                            bg="light"
                            feedbackText={errors?.phone?.message}
                            state={
                                hasKey(errors, "phone") ? "error" : "success"
                            }
                            showState={!!hasKey(errors, "phone")}
                            {...register("phone", {
                                required: "Phone is required",
                            })}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="tw-sr-only">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Your Email *"
                            bg="light"
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
                    <div>
                        <label htmlFor="subject" className="tw-sr-only">
                            Subject
                        </label>
                        <Input
                            id="subject"
                            placeholder="Subject *"
                            bg="light"
                            feedbackText={errors?.subject?.message}
                            state={
                                hasKey(errors, "subject") ? "error" : "success"
                            }
                            showState={!!hasKey(errors, "subject")}
                            {...register("subject", {
                                required: "Subject is required",
                            })}
                        />
                    </div>
                </div>
                <div className="tw-mb-5 md:tw-mb-7.5">
                    <label htmlFor="message" className="tw-sr-only">
                        Comment
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Message"
                        bg="light"
                        feedbackText={errors?.message?.message}
                        state={hasKey(errors, "message") ? "error" : "success"}
                        showState={!!hasKey(errors, "message")}
                        {...register("message", {
                            required: "Message is required",
                        })}
                    />
                </div>
                <Button type="submit" className="tw-w-[180px]">
                    Submit
                </Button>
                {serverMessage && (
                    <Feedback state="success">{serverMessage}</Feedback>
                )}
            </form>
        );
    }
);

export default ContactForm;
