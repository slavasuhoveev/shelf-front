"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { REGISTER_ERROR_MESSAGES } from "@/lib/errors/auth";
import { useRegister } from "@/features/auth/hooks";
import { useAuthUIStore } from "@/store/authUIStore";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const setAuthenticated = useAuthUIStore((s) => s.setAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          setAuthenticated();
          router.replace("/login");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-6 text-xl font-semibold">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            registerMutation.reset();
          }}
          className="w-full border px-3 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            registerMutation.reset();
          }}
          className="w-full border px-3 py-2"
        />

        {registerMutation.isError && (
          <p className="text-sm text-red-600">
              {REGISTER_ERROR_MESSAGES[registerMutation.error.code] ??
               "Registration failed"}
          </p>
        )}

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
