import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { setAccessToken } from "@/lib/api/auth"
import { z } from "zod"

export async function logout() {

  await api(
    endpoints.auth.logout,
    z.any(),
    {
      method: "POST",
    }
  )

  setAccessToken(null)
}
