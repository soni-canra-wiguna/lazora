import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prismadb"
import { User } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "masukkan email anda",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "masukkan password anda",
        },
      },
      async authorize(credentials) {
        //check if email and password credentials is empty/udefined/something
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user: User | null = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })
        // check if user not register
        if (!user || !user?.password) {
          return null
        }
        // check if password credentials and password user in database is not match
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user.password
        )
        if (!isCorrectPassword) {
          return null
        }
        // remove/separate password from user
        const { password, ...userWithoutPassword } = user

        return userWithoutPassword
      },
    }),
  ],
  callbacks: {
    //jwt di gunakan di client, pake ini buat ngakses usernya -> useSession()
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.email = user.email
        token.role = user.role
      }
      return token
    },
    //session di gunakan di server, pake ini buat ngakses usernya -> getServerSession()
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.username = token.username
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/sign-in",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
