import prisma from "@/lib/prismadb"
import { NextResponse, NextRequest } from "next/server"
import { ProductPostProps } from "@/types"
import * as z from "zod"
import { PostMethodeProductSchema } from "@/schema"

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
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
