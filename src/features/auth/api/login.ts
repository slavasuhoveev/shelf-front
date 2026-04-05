import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { LoginResponseSchema } from "@/features/auth/schemas/auth.schema"
import { setAccessToken } from "@/lib/api/auth"
import { getDeviceId } from "@/lib/device"

export async function login(email: string, password: string) {

  const payload = {
    email,
    password,
    device_id: getDeviceId()
  }

  const response = await api(
    endpoints.auth.login,
    LoginResponseSchema,
    {
      method: "POST",
      body: JSON.stringify(payload)
    }
  )

  setAccessToken(response.access_token)

  return response
}
