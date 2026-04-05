import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { LoginResponseSchema } from "@/features/auth/schemas/auth.schema"

export async function refresh() {

  const response = await api(
    endpoints.auth.refresh,
    LoginResponseSchema,
    {
      method: "POST",
      skipAuth: true,
    }
  )

  return response
}
