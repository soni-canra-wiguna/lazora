import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import NextTopLoader from "nextjs-toploader"
import SessionClientProvider from "@/lib/provider/session-client-provider"
import TanstackProvider from "@/lib/provider/tanstask-provider"
import { Toaster } from "@/components/ui/toaster"
import ReduxProvider from "@/lib/provider/redux-provider"
// import PersistGateProvider from "@/lib/provider/persist-gate"

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus_jakarta_sans",
})

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
      <SessionClientProvider>
        <TanstackProvider>
          <ReduxProvider>
            {/* <PersistGateProvider> */}
            <body className={plusJakartaSans.className}>
              <NextTopLoader color="#111111" height={3} showSpinner={false} />
              <Navbar />
              <main>{children}</main>
              <Toaster />
            </body>
            {/* </PersistGateProvider> */}
          </ReduxProvider>
        </TanstackProvider>
      </SessionClientProvider>
    </html>
  )
}
