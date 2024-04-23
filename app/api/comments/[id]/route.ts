import prisma from "@/lib/prismadb"
import { Comment } from "@prisma/client"
import { NextResponse, NextRequest } from "next/server"

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    const body: Comment = await req.json()
    const { email, image, role, message, username } = body

    await prisma.comment.update({
      where: {
        id,
      },
      data: {
        email,
        image,
        role,
        message,
        username,
      },
    })

    return NextResponse.json({
      message: "comment succesfully updated",
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      message: "internal server error",
      status: 500,
    })
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    await prisma.comment.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      message: "comment was deleted",
      status: 204,
    })
  } catch (error) {
    return NextResponse.json({
      message: "internal server error",
      status: 500,
    })
  }
}
