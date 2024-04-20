import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import NextTopLoader from "nextjs-toploader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "lazora",
  description: "beli product resmi ya di lazora",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#111111" height={3} showSpinner={false} />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
