import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface IFormValues {
    newsletter_email: string;
}

const NewsletterForm = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            const response = await axios.post("/api/subscribe", {
                email: data.newsletter_email,
            });

            if (response.status === 200) {
                setMessage("Thank you for subscribing!");
            } else {
                throw new Error("Failed to subscribe");
            }
        } catch (error) {
            console.error("Newsletter subscription error:", error);
            setMessage("Sorry, an error occurred. Please try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="newsletter_email">Email:</label>
            <input
                id="newsletter_email"
                type="email"
                {...register("newsletter_email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                    },
                })}
            />
            {errors?.newsletter_email && (
                <div>{errors.newsletter_email.message}</div>
            )}
            <button type="submit">Subscribe</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default NewsletterForm;
