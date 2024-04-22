import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

async function middleware(req: NextRequestWithAuth) {
  const notSeller = req.nextauth.token?.role !== "SELLER"
  const isLogin = req.nextauth.token ? true : false

  const ProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/dashboard/user") ||
    req.nextUrl.pathname.startsWith("/dashboard/user/create")

  // check if user is not admin
  if (ProtectedRoute && (isLogin || !isLogin) && notSeller) {
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
  matcher: ["/dashboard", "/dashboard/user", "/dashboard/user/create"],
}
