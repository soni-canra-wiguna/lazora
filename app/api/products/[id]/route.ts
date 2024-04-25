import prisma from "@/lib/prismadb"
import { NextResponse, NextRequest } from "next/server"
import { ProductPostProps } from "../route"

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    const singleProduct = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        categories: true,
        comments: true,
      },
    })

    if (!singleProduct) {
      return NextResponse.json({
        message: "product not found",
        status: 404,
      })
    }

    return NextResponse.json({
      message: "product berhasil di ambil",
      product: singleProduct,
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      message: "internal server error",
      error,
      status: 500,
    })
  }
}

// WIP(25 april -> belum selesai)
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    const body: ProductPostProps = await req.json()
    const { title, price, description, stock, categories, images } = body

    const updateProduct = await prisma.product.update({
      where: {
        id,
      },
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

    if (!updateProduct) {
      return NextResponse.json({
        message: "data not found",
        status: 404,
      })
    }

    return NextResponse.json({
      message: "product updated",
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "internal server error",
      error,
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

    await prisma.product.delete({
      where: {
        id,
      },
      include: {
        images: true,
        categories: true,
        comments: true,
      },
    })

    return NextResponse.json({
      message: "product berhasil di hapus",
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
