import { useMutation } from "@tanstack/react-query"
import { logout } from "@/features/auth/api/logout"
import { LogoutResponse } from "../schemas/auth.schema";
import { ApiErrorResponse } from "@/types/errors"
import { useRouter } from "next/navigation";
import { useAuthUIStore } from "@/store/authUIStore";


export function useLogout() {
  const router = useRouter();
  const setGuest = useAuthUIStore((s) => s.setGuest);

  return useMutation<LogoutResponse, ApiErrorResponse>({
    mutationFn: logout,
    onSettled: () => {
      setGuest();
      router.replace("/login");
    },
  });
}
