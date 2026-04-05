import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { MeResponseSchema } from "../schemas/auth.schema"

export async function getMe() {
  return api(
    endpoints.auth.me,
    MeResponseSchema
  )
}
