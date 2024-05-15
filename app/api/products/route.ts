import prisma from "@/lib/prismadb"
import { ProductPostProps } from "@/types"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const body: ProductPostProps = await req.json()
    const { title, price, description, stock, categories, images } = body

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
    console.log(error)
    return NextResponse.json({
      message: "internal server error",
      error: error,
      status: 500,
    })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const products = await prisma.product.findMany({
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
    })

    const query = req.nextUrl.searchParams.get("search")
    const decodeQuery = query?.replace(/-/g, " ").toLowerCase()

    const productsByQuery = await prisma.product.findMany({
      where: {
        title: {
          contains: decodeQuery,
        },
      },
      include: {
        images: true,
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    if (query) {
      return NextResponse.json({
        message: "data pencarian berhasil di ambil",
        products: productsByQuery,
        status: 200,
      })
    }

    if (products.length > 0) {
      return NextResponse.json({
        message: "data berhasil di ambil",
        products,
        status: 200,
      })
    }

    return NextResponse.json({
      message: "data not found",
      status: 404,
    })
  } catch (error) {
    return NextResponse.json({
      message: "internal server error",
      error: error,
      status: 500,
    })
  }
}
