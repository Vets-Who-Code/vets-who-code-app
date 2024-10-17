import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import clsx from "clsx";

type TProps = {
    className?: string;
};

interface IFormValues {
    amount: number;
    name: string;
    email: string;
}

const DonateForm = ({ className }: TProps) => {
    const [serverMessage, setServerMessage] = useState<string>("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormValues>();

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            const response = await axios.post("/api/create-checkout-session", data);
            if (response.status === 200) {
                const { sessionId } = response.data;
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
                await stripe?.redirectToCheckout({ sessionId });
            } else {
                setServerMessage("There was an error. Please try again later.");
            }
        } catch (error) {
            setServerMessage("There was an error. Please try again later.");
        }
    };

    return (
        <form className={clsx(className)} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="amount">Donation Amount</label>
                <input
                    id="amount"
                    type="number"
                    {...register("amount", { required: "Donation amount is required" })}
                />
                {errors.amount && <span>{errors.amount.message}</span>}
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <button type="submit">Donate</button>
            {serverMessage && <p>{serverMessage}</p>}
        </form>
    );
};

export default DonateForm;
