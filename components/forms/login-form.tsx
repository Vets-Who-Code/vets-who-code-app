import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import Input from "@ui/form-elements/input";
import Feedback from "@ui/form-elements/feedback";

const LoginForm = () => {
  const { data: session } = useSession();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await signIn("github", {
      redirect: false,
      ...data,
    });

    if (result?.error) {
      setLoginError(result.error);
    }
  };

  if (session) {
    return (
      <div>
        <p>You are already logged in</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {loginError && <Feedback state="error">{loginError}</Feedback>}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <Input
          id="username"
          type="text"
          {...register("username", { required: "Username is required" })}
          className="mt-1"
        />
        {errors.username && <Feedback state="error">{errors.username.message}</Feedback>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1"
        />
        {errors.password && <Feedback state="error">{errors.password.message}</Feedback>}
      </div>
      <div>
        <Button type="submit" className="w-full">
          Sign in with GitHub
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
