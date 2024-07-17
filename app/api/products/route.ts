import { REDIS_EXPIRATION_TIME } from "@/constants"
import prisma from "@/lib/prismadb"
import { redis } from "@/lib/redis"
import { PostMethodeProductSchema } from "@/schema"
import { ProductPostProps } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

export const POST = async (req: NextRequest) => {
  try {
    const body: ProductPostProps = await req.json()
    const parsedBody = PostMethodeProductSchema.parse(body)
    const { title, price, description, stock, categories, images } = parsedBody

    await prisma.product.create({
      data: {
        title,
        price,
        description,
        stock,
        categories: {
          create: categories.map(({ title }) => ({
            title,
          })),
        },
        images: {
          create: images.map(({ image }) => ({
            image,
          })),
        },
      },
      include: {
        images: true,
        categories: true,
      },
    })

    //invalidate redis cache
    const redisCacheKey = "products"
    await redis.del(redisCacheKey)

    return NextResponse.json(
      {
        message: "product successfully created",
        status: 201,
      },
      { status: 201 },
    )
  } catch (error) {
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
        message: "internal server error",
        status: 500,
      },
      { status: 500 },
    )
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1")
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "20")
    const skip = (page - 1) * limit
    const categories = req.nextUrl.searchParams.get("categories")?.split(",")
    const sortBy = req.nextUrl.searchParams.get("sortBy")
    const totalProducts = await prisma.product.count()
    const searchQuery = req.nextUrl.searchParams
      .get("search")
      ?.replace(/-/g, " ")

    let orderBy = {}
    switch (sortBy) {
      case "feature":
        orderBy = { createdAt: "desc" }
        break
      case "price-high-to-low":
        orderBy = { price: "desc" }
        break
      case "price-low-to-high":
        orderBy = { price: "asc" }
        break
      case "a-z":
        orderBy = { title: "asc" }
        break
      case "z-a":
        orderBy = { title: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    // redis cache
    let redisCacheKey = "products"
    if (sortBy !== null) {
      // handle cache when filter data
      redisCacheKey = `infinitescroll:sortBy=${sortBy}:page=${page}:limit=${limit}`
    }
    if (searchQuery) {
      // handle cache when searching
      redisCacheKey = `search=${searchQuery}:page=${page}:limit=${limit}`
    }

    const cacheProducts = await redis.get(redisCacheKey)
    if (cacheProducts) {
      return NextResponse.json(JSON.parse(cacheProducts))
    }

    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
        // sumpah ni gua gak ngerti lagi, ini gimana caranya filter data relation brooo
        // categories: {
        //   every: {
        //     title: {
        //       in: categories,
        //     }
        //   }
        // }
      },
      include: {
        images: true,
        categories: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy,
      skip: skip,
      take: limit,
    })

    if (!totalProducts) {
      return NextResponse.json(
        {
          message: "data not found",
          status: 404,
        },
        { status: 404 },
      )
    }

    if (searchQuery && !products) {
      return NextResponse.json(
        {
          message: "search result not found",
          status: 404,
        },
        { status: 404 },
      )
    }

    const responseMessage = searchQuery
      ? "Search results successfully retrieved"
      : "Products successfully retrieved"
    const responseTotalPages = Math.ceil(
      searchQuery ? products.length : totalProducts / limit,
    )

    const response = {
      message: responseMessage,
      data: products,
      currentPage: page,
      totalPages: responseTotalPages,
      totalProductsPerPage: products.length,
      totalProducts,
      status: 200,
    }

    await redis.set(
      redisCacheKey,
      JSON.stringify(response),
      "EX",
      REDIS_EXPIRATION_TIME,
    )

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "internal server error",
        error: error,
        status: 500,
      },
      {
        status: 500,
      },
    )
  }
}
