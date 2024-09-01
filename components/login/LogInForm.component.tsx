import { useApiRequest } from "@/hooks/useApiRequest";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../common/Spinner.component";

// Define the TypeScript types for the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  //Hooks
  const { makeRequest, isLoading } = useApiRequest();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  //Actions
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await makeRequest({
        endpoint: "interview/login",
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
        },
        isLogin: true,
        redirectTo: "/material_purchase",
        onSuccess: (result) => {
          toast.success("Log in Successful");
        },
        onError: () => {
          toast.error("Login failed. Please Try Again later");
        },
      });
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 md:gap-10">
      <div className="flex flex-col md:gap-2">
        <div className="flex flex-col gap-1 md:gap-3">
          <label htmlFor="email" className="font-medium ">
            Email
          </label>
          <div className="w-full">
            <input
              id="email"
              type="email"
              defaultValue=""
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="p-2 md:p-3.5 rounded-xl text-base border w-full border-border-2 focus:outline-none"
            />
            <div className="h-3 md:h-5">
              {errors.email && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-3">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <div className="w-full">
            <input
              id="password"
              type="password"
              defaultValue=""
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="p-2 md:p-3.5 rounded-xl text-base border w-full border-border-2 focus:outline-none"
            />
            <div className="h-3 md:h-5">
              {errors.password && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-28 md:w-36 ml-auto md:ml-0 rounded-lg flex items-center justify-center gap-1 md:text-base text-sm font-semibold py-2 md:py-3.5 bg-primary text-white">
        {isLoading ? <Spinner className="w-4 h-4" /> : null}
        <p>Sign In</p>
      </button>
    </form>
  );
};
export default LoginForm;
