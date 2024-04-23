import prisma from "@/lib/prismadb"
import { Comment } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const body: Comment = await req.json()
    const { username, email, role, message, image, productId } = body

    const isProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    })

    if (!isProduct) {
      return NextResponse.json({
        message: "cannot post comment, product not found",
        status: 400,
      })
    }

    await prisma.comment.create({
      data: {
        username,
        email,
        role,
        image,
        message,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    })

    return NextResponse.json({
      message: "comment berhasil di post",
      status: 201,
    })
  } catch (error) {
    return NextResponse.json({
      message: "internal server error",
      error,
      status: 500,
    })
  }
}
