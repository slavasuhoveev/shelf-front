import { useMutation } from "@tanstack/react-query"
import { login } from "@/features/auth/api/login"
import { ApiErrorResponse } from "@/types/errors";
import { LoginResponse } from "../schemas/auth.schema";
import { LoginFormValues } from "../forms/login.schema";

export function useLogin() {
  return useMutation<LoginResponse, ApiErrorResponse, LoginFormValues>({
    mutationFn: (data) => login(data.email, data.password)
  })
}
