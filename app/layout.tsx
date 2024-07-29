import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layouts/navbar"
import NextTopLoader from "nextjs-toploader"
import SessionClientProvider from "@/lib/provider/session-client-provider"
import TanstackProvider from "@/lib/provider/tanstask-provider"
import { Toaster } from "@/components/ui/toaster"
import ReduxProvider from "@/lib/provider/redux-provider"
import Footer from "@/components/layouts/footer"
import BackToTop from "@/components/buttons/back-to-top"

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus_jakarta_sans",
})

export const metadata: Metadata = {
  title: {
    default: "Lazora",
    template: "%s | Lazora",
  },
  description: "beli product ori dan resmi ya di lazora",
  referrer: "origin-when-cross-origin",
  applicationName: "Lazora",
  icons: {
    icon: "/lazora.png",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  keywords: [
    "website",
    "e-commerce",
    "e commerce",
    "lazada",
    "zalora",
    "zalora",
    "za lora",
    "website jualan",
    "shopee",
    "tokopedia",
    "website online",
    "jualan online",
    "online shopping",
    "mechanical keyboard",
    "keycaps",
    "switch",
    "product",
    "paris",
    "elegant",
  ],
  authors: [{ name: "soni canra wiguna", url: "https://instagram.com" }],
  creator: "soni canra wiguna",
  publisher: "soni canra wiguna",
  generator: "Next.Js 14.2",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://lazora.vercel.app/"),
  alternates: {
    canonical: "https://lazora.vercel.app/",
  },
  openGraph: {
    title: {
      default: "Lazora",
      template: "%s | Lazora",
    },
    description: "beli product ori dan resmi ya di lazora",
    url: "https://lazora.vercel.app/",
    images: [
      {
        url: "https://utfs.io/f/1babe6d8-edaa-41d8-a92b-38ba7a19961b-77e66h.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "id_ID",
  },
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
            <body className={plusJakartaSans.className}>
              <NextTopLoader color="#111111" height={3} showSpinner={false} />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <BackToTop />
              <Toaster />
            </body>
          </ReduxProvider>
        </TanstackProvider>
      </SessionClientProvider>
    </html>
  )
}
