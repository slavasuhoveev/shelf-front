import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authClient } from "@/lib/api/authClient";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/auth";
import { ApiError } from "@/types/errors";
import type { MeResponse } from "@/types/auth";


export function useRegister() {
  return useMutation<
    RegisterResponse,
    ApiError,
    Pick<RegisterRequest, "email" | "password">
  >({
    mutationFn: (data: Pick<RegisterRequest, "email" | "password">) =>
      authClient.register(data),
  });
}

export function useLogin() {
  return useMutation<LoginResponse, ApiError, Pick<LoginRequest, "email" | "password">>({
    mutationFn: (data: Pick<LoginRequest, "email" | "password">) =>
      authClient.login(data),
  });
}

export function useMe(
  options?: Omit<
    UseQueryOptions<MeResponse, ApiError>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<MeResponse, ApiError>({
    queryKey: ["me"],
    queryFn: () => authClient.me(),
    ...options,
  });
}
