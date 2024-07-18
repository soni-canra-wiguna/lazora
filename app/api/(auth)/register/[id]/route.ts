import prisma from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { User } from "@prisma/client"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return NextResponse.json({ message: "user not found", status: 404 })
    }

    return NextResponse.json({
      message: "user data retrieval successful",
      user,
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error.",
      status: 500,
    })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const body = await req.json()
    const { username, email, password, image, role } = body

    let updatedData: any = { username, email, image, role }
    if (password) {
      //hash password when user edit the password
      const hashedPassword = await bcrypt.hash(password, 10)
      updatedData.password = hashedPassword
    }

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: updatedData,
    })

    if (!updateUser) {
      return NextResponse.json({
        message: "user not found, can't updated",
        status: 404,
      })
    }

    return NextResponse.json({
      message: "data successfully updated.",
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Internal server error.",
      status: 500,
    })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    await prisma.user.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ status: 200, message: "user was deleted" })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error.",
    })
  }
}
