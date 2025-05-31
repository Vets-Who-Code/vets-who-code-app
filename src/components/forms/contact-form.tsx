import EmojiRain from "@components/EmojiRain";
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

const ContactForm = forwardRef<HTMLFormElement, TProps>(({ className }, ref) => {
    const [serverMessage, setServerMessage] = useState<string>("");
    const [showEmojiRain, setShowEmojiRain] = useState<boolean>(false);

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
                setShowEmojiRain(true);
                setTimeout(() => setShowEmojiRain(false), 5000);
                reset();
            } else {
                setServerMessage("There was an error. Please try again later.");
            }
        } catch (error) {
            setServerMessage("There was an error. Please try again later.");
        }
    };

    return (
        <form
            className={clsx("tw-space-y-6", className)}
            ref={ref}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="tw-grid tw-grid-cols-1 tw-gap-5 md:tw-grid-cols-2 md:tw-gap-7.5">
                <div className="tw-space-y-2">
                    <label
                        htmlFor="name"
                        className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                    >
                        Name
                    </label>
                    <Input
                        id="name"
                        placeholder="Your Name *"
                        className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                        feedbackText={errors?.name?.message}
                        state={hasKey(errors, "name") ? "error" : "success"}
                        showState={!!hasKey(errors, "name")}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                </div>
                <div className="tw-space-y-2">
                    <label
                        htmlFor="phone"
                        className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                    >
                        Phone
                    </label>
                    <Input
                        id="phone"
                        placeholder="Your Phone *"
                        className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                        feedbackText={errors?.phone?.message}
                        state={hasKey(errors, "phone") ? "error" : "success"}
                        showState={!!hasKey(errors, "phone")}
                        {...register("phone", {
                            required: "Phone is required",
                        })}
                    />
                </div>
                <div className="tw-space-y-2">
                    <label
                        htmlFor="email"
                        className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                    >
                        Email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Your Email *"
                        className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
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
                <div className="tw-space-y-2">
                    <label
                        htmlFor="subject"
                        className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                    >
                        Subject
                    </label>
                    <Input
                        id="subject"
                        placeholder="Subject *"
                        className="tw-w-full tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                        feedbackText={errors?.subject?.message}
                        state={hasKey(errors, "subject") ? "error" : "success"}
                        showState={!!hasKey(errors, "subject")}
                        {...register("subject", {
                            required: "Subject is required",
                        })}
                    />
                </div>
            </div>
            <div className="tw-space-y-2">
                <label
                    htmlFor="message"
                    className="tw-block tw-text-sm tw-font-medium tw-text-[#091f40]"
                >
                    Message
                </label>
                <Textarea
                    id="message"
                    placeholder="Message"
                    className="tw-w-full tw-resize-none tw-rounded-lg tw-border tw-border-[#091f40] tw-bg-white tw-px-4 tw-py-3 tw-text-[#091f40] tw-transition tw-duration-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40]"
                    feedbackText={errors?.message?.message}
                    state={hasKey(errors, "message") ? "error" : "success"}
                    showState={!!hasKey(errors, "message")}
                    {...register("message", {
                        required: "Message is required",
                    })}
                />
            </div>
            <div className="tw-w-full">
                <Button
                    type="submit"
                    className="tw-w-full tw-transform tw-rounded-lg tw-bg-[#c5203e] tw-px-6 tw-py-4 tw-font-semibold tw-text-white tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-[#a91b35] focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#c5203e] focus:tw-ring-offset-2"
                >
                    Submit
                </Button>
            </div>
            {serverMessage && <Feedback state="success">{serverMessage}</Feedback>}
            {showEmojiRain && <EmojiRain />}
        </form>
    );
});

export default ContactForm;
