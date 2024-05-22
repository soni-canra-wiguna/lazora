import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

async function middleware(req: NextRequestWithAuth) {
  const isSeller = req.nextauth.token?.role === "SELLER"

  const ProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/dashboard/banner/create") ||
    req.nextUrl.pathname.startsWith("/dashboard/products/create")

  // check if user is not admin
  if (ProtectedRoute && !isSeller) {
    return NextResponse.rewrite(new URL("/denied", req.url))
  }
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/sign-in",
  },
})

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/banner/create",
    "/dashboard/products/create",
  ],
}
