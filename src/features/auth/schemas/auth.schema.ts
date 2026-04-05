import { z } from "zod"


export const RegisterResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
})


export const LoginResponseSchema = z.object({
  access_token: z.string()
})

export const MeResponseSchema = z.object({
  id: z.uuid(),
  email: z.email()
})

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type MeResponse = z.infer<typeof MeResponseSchema>
export type LogoutResponse = void
