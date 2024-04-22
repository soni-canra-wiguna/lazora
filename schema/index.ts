import { FORM_OPTIONS } from "@/utils/form-options"
import * as z from "zod"

const roleOptions = FORM_OPTIONS.role.map((role) => role)

export const SignInSchema = z.object({
  email: z.string().email().min(1, {
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
})

export const RegisterSchema = z.object({
  image: z.string().optional(),
  username: z.string().min(1, {
    message: "username is required",
  }),
  email: z.string().email().min(1, {
    message: "email is required",
  }),
  password: z.string().optional(),
  role: z.enum([roleOptions[0], ...roleOptions]),
})
