"use client";

import { useLogin } from "@/features/auth/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_ERROR_MESSAGES } from "@/lib/errors/auth";
import { useAuthUIStore } from "@/store/authUIStore";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const setAuthenticated = useAuthUIStore((s) => s.setAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          setAuthenticated();
          router.replace("/app");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-6 text-xl font-semibold">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            loginMutation.reset();
          }}
          className="w-full border px-3 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            loginMutation.reset();
          }}
          className="w-full border px-3 py-2"
        />

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
