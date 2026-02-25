"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/api/authClient";
import { useAuthUIStore } from "@/store/authUIStore";

export function LogoutButton() {
  const router = useRouter();
  const setGuest = useAuthUIStore((s) => s.setGuest);

  const handleLogout = async () => {
    try {
      await authClient.logout();
    } finally {
      setGuest();
      router.replace("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-zinc-600 hover:text-black"
    >
      Logout
    </button>
  );
}
