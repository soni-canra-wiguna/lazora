import prisma from "@/lib/prismadb"
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

    return NextResponse.json({
      message: "product successfully created",
      status: 201,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: "Validation error",
        errors: error.errors,
        status: 400,
      })
    }

    return NextResponse.json({
      message: "internal server error",
      status: 500,
    })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    // pagination
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1")
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "20")
    const skip = (page - 1) * limit

    // search product
    const query = req.nextUrl.searchParams.get("search")
    const decodeQuery = query?.replace(/-/g, " ")

    // get total product
    const totalProducts = await prisma.product.count()

    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: decodeQuery,
          mode: "insensitive",
        },
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
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    })

    if (decodeQuery) {
      return NextResponse.json({
        message: "data pencarian berhasil di ambil",
        products,
        currentPage: page,
        totalPages: Math.ceil(products.length / limit),
        totalProducts: products.length,
        status: 200,
      })
    }

    if (products.length > 0) {
      return NextResponse.json({
        message: "data berhasil di ambil",
        products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalItems: products.length,
        totalProducts,
        status: 200,
      })
    }

    return NextResponse.json({
      message: "data not found",
      status: 404,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "internal server error",
      error: error,
      status: 500,
    })
  }
}
