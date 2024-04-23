import prisma from "@/lib/prismadb"
import { Prisma, User } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const body: User = await req.json()

    const { username, email, password, role }: User = body

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json({
        status: 400,
        message: "user already exist",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    })

    return NextResponse.json({
      status: 201,
      message: "register success.",
    })
  } catch (error) {
    // console.error("error in POST methode User ==> ", error)

    // if (error instanceof Prisma.PrismaClientInitializationError) {
    //   return NextResponse.json({
    //     status: 400, // Bad Request
    //     message: "Error creating user. Please check your input data.",
    //   })
    // } else {
    return NextResponse.json({
      status: 500, // Internal Server Error
      message: "Failed to create user. Please try again later.",
    })
    // }
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    const query = req.nextUrl.searchParams.get("query")
    const decodeQuery = query?.replace(/-/g, " ").toLowerCase()

    if (query) {
      const findRegisteUserByQuery = await prisma.user.findMany({
        where: {
          username: {
            contains: decodeQuery,
          },
        },
      })

      return NextResponse.json({
        message: "user is here",
        user: findRegisteUserByQuery,
        status: 200,
      })
    } else {
      if (users.length > 0) {
        return NextResponse.json({
          message: "Data retrieved successfully",
          users,
          status: 200,
        })
      } else {
        return NextResponse.json({
          message: "user not found",
          status: 404,
        })
      }
    }
  } catch (error) {
    return NextResponse.json({
      message: "failed to get user data, see your connection",
      status: 500,
    })
  }
}
