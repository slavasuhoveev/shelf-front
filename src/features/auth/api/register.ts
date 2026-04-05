import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { getDeviceId } from "@/lib/device"
import { RegisterResponseSchema } from "../schemas/auth.schema";

export async function register(email: string, password: string) {

  const payload = {
    email,
    password,
    device_id: getDeviceId(),
  }

  const response = await api(
    endpoints.auth.register,
    RegisterResponseSchema,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )

  return response
}
