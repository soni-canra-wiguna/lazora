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

export const ProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
  image: z.array(z.string()),
  categories: z.array(z.string()),
})

const ImageSchema = z.object({
  image: z.string().url(),
})

const CategorySchema = z.object({
  title: z.string(),
})

export const PostMethodeProductSchema = z.object({
  title: z.string(),
  price: z.number().positive(),
  description: z.string(),
  stock: z.number().positive(),
  categories: z.array(CategorySchema),
  images: z.array(ImageSchema),
})

export const CommentSchema = z.object({
  comment: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  role: z.enum([roleOptions[0], ...roleOptions]).optional(),
  productId: z.string(),
})

export const BannerSchema = z.object({
  title: z.string(),
  description: z.string(),
  title_button: z.string(),
  href_button: z.string(),
  image: z.string(),
  alt_image: z.string(),
  background_color: z.string(),
})
