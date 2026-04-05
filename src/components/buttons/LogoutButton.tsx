"use client";

import { useLogout } from "@/features/auth/hooks/useLogout";

export function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <button
      onClick={() => logoutMutation.mutate()}
      className="text-sm text-zinc-600 hover:text-black"
    >
      Logout
    </button>
  );
}
