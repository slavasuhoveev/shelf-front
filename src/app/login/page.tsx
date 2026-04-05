"use client";

import { useLogin } from "@/features/auth/hooks/useLogin";
import { useRouter } from "next/navigation";
import { LOGIN_ERROR_MESSAGES } from "@/lib/errors/auth";
import { useAuthUIStore } from "@/store/authUIStore";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginFormSchema,
  LoginFormValues,
} from "@/features/auth/forms/login.schema";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const setAuthenticated = useAuthUIStore((s) => s.setAuthenticated);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        setAuthenticated();
        router.replace("/app");
      },
    });
  };

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-6 text-xl font-semibold">Login</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...form.register("email")}
          className="w-full border px-3 py-2"
        />

        {form.formState.errors.email && (
          <p className="text-sm text-red-600">
            {form.formState.errors.email.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...form.register("password")}
          className="w-full border px-3 py-2"
        />

        {form.formState.errors.password && (
          <p className="text-sm text-red-600">
            {form.formState.errors.password.message}
          </p>
        )}

        {loginMutation.isError && (
          <p className="text-sm text-red-600">
            {LOGIN_ERROR_MESSAGES[loginMutation.error.code] ?? "Login failed."}
          </p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-black py-2 text-white disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="mt-4 text-sm text-zinc-600 text-center">
        Don’t have an account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </div>
  );
}
