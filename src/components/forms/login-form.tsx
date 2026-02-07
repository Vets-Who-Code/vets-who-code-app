/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useUser } from "@contexts/user-context";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import Checkbox from "@ui/form-elements/checkbox";
import FeedbackText from "@ui/form-elements/feedback";
import Input from "@ui/form-elements/input";
import { hasKey } from "@utils/methods";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
        <div className="tw-max-w-[470px] tw-bg-white tw-px-[50px] tw-pb-[50px] tw-pt-7.5 tw-shadow-2xs tw-shadow-heading/10">
            <h3 className="tw-mb-5 tw-text-h2">Login</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                <div className="tw-mb-7.5">
                    <label htmlFor="username" className="tw-text-md tw-text-heading">
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
                    <label htmlFor="password" className="tw-text-md tw-text-heading">
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
                {serverState && <FeedbackText>{serverState}</FeedbackText>}
                <Button type="submit" fullwidth={true} className="tw-mt-7.5">
                    Log In
                </Button>
                <div className="tw-mt-5 tw-flex tw-flex-col tw-items-center tw-justify-center">
                    <Anchor path="/forgot-password" className="tw-mb-2">
                        Forgot Password?
                    </Anchor>
                    <Anchor path="/register">Register New Account</Anchor>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
