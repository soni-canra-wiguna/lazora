import { REDIS_EXPIRATION_TIME } from "@/constants"
import prisma from "@/lib/prismadb"
import { redis } from "@/lib/redis"
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

    //invalidate banner cache
    await redis.del("banners")

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
    // redis cache
    const redisCacheKey = `banners`
    const cacheBanners = await redis.get(redisCacheKey)

    if (cacheBanners) {
      return NextResponse.json(JSON.parse(cacheBanners))
    }

    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    if (!banners) {
      return NextResponse.json(
        {
          status: 404,
          message: "data not found",
        },
        { status: 404 },
      )
    }

    const response = {
      message: "Data retrieved successfully",
      data: banners,
      status: 200,
    }

    await redis.set(
      redisCacheKey,
      JSON.stringify(response),
      "EX",
      REDIS_EXPIRATION_TIME,
    ) // EX = expiration, REDIS_EXPIRATION_TIME = expiration time

    return NextResponse.json(response, { status: 200 })
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
