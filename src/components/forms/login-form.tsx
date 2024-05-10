/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Checkbox from "@ui/form-elements/checkbox";
import FeedbackText from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import { useUser } from "@contexts/user-context";

interface IFormValues {
    username: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();
    const [serverState, setServerState] = useState("");
    const { setLogin } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>({
        defaultValues: {
            username: "Admin",
            password: "Admin",
        },
    });

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        if (data.username === "Admin" && data.password === "Admin") {
            setLogin();
            setServerState("");
            if (window?.history?.length > 2) {
                router.back();
            }
        } else {
            setServerState("Username or password is incorrect");
        }
    };

    return (
        <div className="tw-bg-white tw-shadow-2xs tw-shadow-heading/10 tw-max-w-[470px] tw-pt-7.5 tw-pb-[50px] tw-px-[50px]">
            <h3 className="tw-text-h2 tw-mb-5">Login</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="username"
                        className="tw-text-heading tw-text-md"
                    >
                        Username *
                    </label>
                    <Input
                        id="username"
                        placeholder="Username"
                        bg="light"
                        feedbackText={errors?.username?.message}
                        state={hasKey(errors, "username") ? "error" : "success"}
                        showState={!!hasKey(errors, "username")}
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                    <small>Default Username: Admin</small>
                </div>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="password"
                        className="tw-text-heading tw-text-md"
                    >
                        Password *
                    </label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        bg="light"
                        autoComplete="true"
                        feedbackText={errors?.password?.message}
                        state={hasKey(errors, "password") ? "error" : "success"}
                        showState={!!hasKey(errors, "password")}
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <small>Default Password: Admin</small>
                </div>
                <Checkbox name="remember" id="remember" label="Remember me" />
                <Button type="submit" fullwidth className="tw-mt-7.5">
                    Log In
                </Button>
                {serverState && <FeedbackText>{serverState}</FeedbackText>}
            </form>
        </div>
    );
};

export default LoginForm;
