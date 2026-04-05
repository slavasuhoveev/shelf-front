"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "@/features/auth/hooks/useRegister";
import { REGISTER_ERROR_MESSAGES } from "@/lib/errors/auth";

import {
  RegisterFormSchema,
  type RegisterFormInput,
} from "@/features/auth/forms/register.schema";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const form = useForm<RegisterFormInput>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: RegisterFormInput) => {
    registerMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.replace("/login");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-6 text-xl font-semibold">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border px-3 py-2"
          />
          {errors.password && (
            <p className="text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            className="w-full border px-3 py-2"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* SERVER ERROR */}
        {registerMutation.isError && (
          <p className="text-sm text-red-600">
            {REGISTER_ERROR_MESSAGES[registerMutation.error.code!] ??
              registerMutation.error.message}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-black py-2 text-white disabled:opacity-50"
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-zinc-600">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
