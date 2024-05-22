import prisma from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"
import { Banner } from "@prisma/client"

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    const body: Banner = await req.json()
    const {
      title,
      description,
      title_button,
      href_button,
      image,
      alt_image,
      background_color,
    } = body

    const updateBanner = await prisma.banner.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        title_button,
        href_button,
        image,
        alt_image,
        background_color,
      },
    })

    if (!updateBanner) {
      return NextResponse.json({
        message: "banner not found, can't updated",
        status: 404,
      })
    }

    return NextResponse.json({
      message: "banner successfully updated.",
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    })
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    await prisma.banner.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ status: 200, message: "banner was deleted" })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    })
  }
}
