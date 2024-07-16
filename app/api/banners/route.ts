import prisma from "@/lib/prismadb"
import { BannerSchema } from "@/schema"
import { Banner } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

export const POST = async (req: NextRequest) => {
  try {
    const body: Banner = await req.json()
    const parsedBody = BannerSchema.parse(body)
    const {
      title,
      description,
      title_button,
      href_button,
      image,
      alt_image,
      background_color,
    } = parsedBody

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

    return NextResponse.json(
      {
        status: 201,
        message: "banner successfully created!!",
      },
      { status: 201 },
    )
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors,
          status: 400,
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
      },
      { status: 500 },
    )
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
        data: banners,
        message: "Data retrieved successfully",
      })
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: "data not found",
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
