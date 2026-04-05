import { useMutation } from "@tanstack/react-query";
import { register } from "@/features/auth/api/register";
import { ApiErrorResponse } from "@/types/errors";
import { RegisterResponse } from "../schemas/auth.schema";
import { RegisterRequest } from "../forms/register.schema";


export function useRegister() {
  return useMutation<RegisterResponse, ApiErrorResponse, RegisterRequest>({
    mutationFn: (data) =>
      register(data.email, data.password),
  })
}
