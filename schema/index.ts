import { FORM_OPTIONS } from "@/data/form-options"
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

// =======================
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

//dia ni di pake buat patch methode product, tapi masih conflict di schemanya,
//untuk patch methodenya sendiri working perfectly fine sih

// const ImageSchema = z.object({
//   image: z.string().url().optional(),
// })

// const CategorySchema = z.object({
//   title: z.string().optional(),
// })

// export const PostMethodeProductSchema = z.object({
//   title: z.string().optional(),
//   price: z.number().positive().optional(),
//   description: z.string().optional(),
//   stock: z.number().positive().optional(),
//   categories: z.array(CategorySchema).optional(),
//   images: z.array(ImageSchema).optional(),
// })
// =======================

export const CommentSchema = z.object({
  comment: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  role: z.enum([roleOptions[0], ...roleOptions]).optional(),
  productId: z.string(),
})

export const BannerSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  title_button: z.string().min(1, {
    message: "title button is required",
  }),
  href_button: z.string().min(1, {
    message: "href button is required",
  }),
  image: z.string().min(1, {
    message: "image is required",
  }),
  alt_image: z.string().min(1, {
    message: "alt image is required",
  }),
  background_color: z.string().min(1, {
    message: "background color is required",
  }),
})
