import { Role } from "@prisma/client"
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string | null | undefined
      role: Role
      email: string
      image: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    role: Role
    username: string
    email: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    role: Role
    username: string
    email: string
  }
}
