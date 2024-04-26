import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Input from "@ui/form-elements/input";
import Button from "@ui/button";
import Feedback from "@ui/form-elements/feedback";

interface IFormValues {
  email: string;
  password: string;
}

interface TProps {
  className?: string;
}

const LoginForm: React.FC<TProps> = ({ className }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      const response = await axios.post('https://api.yoursite.com/login', data);
      if (response.status === 200) {
        console.log('Login successful:', response.data); // Handle login success
      } else {
        throw new Error('Login failed!');
      }
    } catch (error) {
      console.error('Login failed. Please try again.', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="tw-mb-4">
        <Input
          id="email"
          type="email"
          placeholder="Email"
          feedbackText={errors.email?.message}
          {...register("email", { required: "Email is required", pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
        />
      </div>
      <div className="tw-mb-6">
        <Input
          id="password"
          type="password"
          placeholder="Password"
          feedbackText={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
      </div>
      {errors.email && <Feedback state="error">{errors.email.message}</Feedback>}
      {errors.password && <Feedback state="error">{errors.password.message}</Feedback>}
      <Button type="submit" className="tw-w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
