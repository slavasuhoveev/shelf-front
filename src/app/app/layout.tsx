"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/features/auth/hooks";
import { useAuthUIStore } from "@/store/authUIStore";
import { refreshAccessToken } from "@/lib/api/fetcher";
import { LogoutButton } from "@/components/buttons/LogoutButton";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const status = useAuthUIStore((s) => s.status);
  const setAuthenticated = useAuthUIStore((s) => s.setAuthenticated);
  const setGuest = useAuthUIStore((s) => s.setGuest);

  /**
   * 🔹 STEP 1 — Bootstrap only once
   * If page reloaded and we don't know auth state yet
   */
  useEffect(() => {
    const bootstrap = async () => {
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        setAuthenticated();
      } else {
        setGuest();
      }
    };

    if (status === "checking") {
      bootstrap();
    }
  }, [status, setAuthenticated, setGuest]);

  /**
   * 🔹 STEP 2 — Call /me only if authenticated
   */
  const meQuery = useMe({
    enabled: status === "authenticated",
    retry: false,
  });

  /**
   * 🔹 STEP 3 — If /me fails → user is invalid → logout
   */
  useEffect(() => {
    if (meQuery.isError) {
      setGuest();
      router.replace("/login");
    }
  }, [meQuery.isError, setGuest, router]);

  /**
   * 🔹 STEP 4 — If guest → redirect
   */
  useEffect(() => {
    if (status === "guest") {
      router.replace("/login");
    }
  }, [status, router]);

  /**
   * 🔹 UI states
   */
  if (status === "checking") {
    return (
      <div className="flex h-screen items-center justify-center">
        Checking authentication…
      </div>
    );
  }

  if (status === "authenticated" && meQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="font-semibold">Shelf</div>
        <LogoutButton />
      </header>

      <div className="min-h-screen">{children}</div>
    </div>
  );
}
