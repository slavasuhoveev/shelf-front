import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { getMe } from "@/features/auth/api/getMe"
import type { MeResponse } from "@/features/auth/schemas/auth.schema"
import { ApiErrorResponse } from "@/types/errors"

export function useMe(
  options?: Omit<
    UseQueryOptions<MeResponse, ApiErrorResponse>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<MeResponse, ApiErrorResponse>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
    ...options,
  })
}
