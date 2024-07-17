"use server"

import prisma from "./prismadb"
import { revalidateTag } from "next/cache"
import { CommentSchema } from "@/schema"
import { createSafeActionClient } from "next-safe-action"

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
      console.log(error)
      return { message: "failed to post comment" }
    }
  },
)
