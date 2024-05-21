"use server"

import * as z from "zod"
import prisma from "./prismadb"
import { revalidateTag } from "next/cache"
import { CommentSchema } from "@/schema"
import { createSafeActionClient } from "next-safe-action"

type PostComment = z.infer<typeof CommentSchema>

// export async function postComment({
//   comment,
//   username,
//   email,
//   image,
//   role,
//   productId,
// }: PostComment) {
//   try {
//     await prisma.comment.create({
//       data: {
//         // @ts-ignore
//         message: comment,
//         username,
//         email,
//         image,
//         role,
//         product: {
//           connect: {
//             id: productId,
//           },
//         },
//       },
//     })

//     revalidateTag("singleProduct")
//   } catch (error) {
//     return { message: "failed to post comment" }
//   }
// }

export const action = createSafeActionClient()

export const createSafeComment = action(
  CommentSchema,
  async ({ comment, username, email, image, role, productId }) => {
    if (!comment) return
    try {
      await prisma.comment.create({
        data: {
          // @ts-ignore
          message: comment,
          username,
          email,
          image,
          role,
          product: {
            connect: {
              id: productId,
            },
          },
        },
      })

      revalidateTag("singleProduct")
    } catch (error) {
      return { message: "failed to post comment" }
    }
  }
)
