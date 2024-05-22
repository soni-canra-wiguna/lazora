import prisma from "@/lib/prismadb"
import { Banner } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
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

    await prisma.banner.create({
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

    return NextResponse.json({
      status: 201,
      message: "banner successfully created!!",
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    if (banners.length > 0) {
      return NextResponse.json({
        status: 200,
        banners,
        message: "Data retrieved successfully",
      })
    } else {
      return NextResponse.json({
        status: 404,
        message: "data not found",
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    })
  }
}
