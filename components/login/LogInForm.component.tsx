import { setCredentials } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Define the TypeScript types for the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await fetch(
        "https://devapi.propsoft.ai/api/interview/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();

      dispatch(
        setCredentials({
          email: result.user_data.email,
          token: result.access_token,
        })
      );

      router.push("/material_purchase");
    } catch (error) {}
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
        className="px-6 md:px-12 ml-auto md:ml-0 rounded-lg md:text-base text-sm font-semibold py-2 md:py-3.5 bg-primary text-white w-fit">
        Sign In
      </button>
    </form>
  );
};
export default LoginForm;
