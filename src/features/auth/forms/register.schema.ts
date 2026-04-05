import { z } from "zod"

const baseSchema = z.object({
  email: z.email("Invalid email"),
  password: z
  .string()
  .min(8, "Minimum 8 characters")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/\d/, "Must contain a digit")
  .regex(/[^\w\s]/, "Must contain a symbol"),
  confirmPassword: z.string(),
})

export type RegisterFormInput = z.infer<typeof baseSchema>

export type RegisterRequest = {
  email: string
  password: string
}

export const RegisterFormSchema = baseSchema.superRefine(
  (data: RegisterFormInput, ctx: z.RefinementCtx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      })
    }
  }
)
