import prisma from "@/lib/prismadb"
import { NextResponse, NextRequest } from "next/server"
import { ProductPostProps } from "@/types"
import * as z from "zod"
import { PostMethodeProductSchema } from "@/schema"
import { redis } from "@/lib/redis"
import { REDIS_EXPIRATION_TIME } from "@/constants"

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params
    // redis cache
    const redisCacheKey = `product:${id}`
    const cacheProduct = await redis.get(redisCacheKey)

    if (cacheProduct) {
      return NextResponse.json(JSON.parse(cacheProduct))
    }

    const singleProduct = await prisma.product.findUnique({
      where: {
        id,
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
    })

    if (!singleProduct) {
      return NextResponse.json({
        message: "product not found",
        status: 404,
      })
    }

    const response = {
      message: "Product successfully retrieved",
      data: singleProduct,
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
    return NextResponse.json({
      message: "internal server error",
      error,
      status: 500,
    })
  }
}

// WIP, cannot update one to many relation(i'm so confuseeeee how to update this model data /: )
// 8 june 2024: ni patch methode udah bisa cuma buat typenya masih conflict dan harus dibuat optional semua,
//              jadi ya buat sekarang kita hide dulu ya ni methode, kalo ngga dan kita coba update dia bakal
//              kena error dari zod schema nya.
// export const PATCH = async (
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) => {
//   try {
//     const { id } = params
//     const body = await req.json()
//     const parsedBody = PostMethodeProductSchema.parse(body)
//     const { title, price, description, stock, categories, images } = parsedBody

//     const updateData = {
//       ...(title && { title }),
//       ...(price && { price }),
//       ...(description && { description }),
//       ...(stock && { stock }),
//       ...(categories && {
//         categories: {
//           deleteMany: {},
//           create: categories.map(({ title }) => ({
//             title,
//           })),
//         },
//       }),
//       ...(images && {
//         images: {
//           deleteMany: {},
//           create: images.map(({ image }) => ({
//             image,
//           })),
//         },
//       }),
//     }

//     const updatedProduct = await prisma.product.update({
//       where: { id },
//       data: updateData,
//       include: {
//         images: true,
//         categories: true,
//       },
//     })

//     return NextResponse.json({
//       message: "Product successfully updated",
//       product: updatedProduct,
//       status: 200,
//     })
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({
//         message: "Validation error",
//         errors: error.errors,
//         status: 400,
//       })
//     }

//     return NextResponse.json({
//       message: "Internal server error",
//       status: 500,
//     })
//   }
// }

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
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

    await redis.del("products")
    await redis.del(`product:${id}`)

    return NextResponse.json(
      {
        message: "product deleted",
        status: 201,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server error",
        error,
        status: 500,
      },
      { status: 500 },
    )
  }
}
