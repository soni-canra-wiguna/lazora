"use client"

import { cn } from "@/lib/utils"
import MaxWidthWrapper from "./../max-width-wrapper"
import Link from "next/link"
import { CATEGORIES } from "@/data/categories"
import { Input } from "../ui/input"
import { Mail, ArrowRight } from "lucide-react"
import { IoLogoInstagram } from "react-icons/io"
import { ImFacebook } from "react-icons/im"
import { RiTwitterXLine } from "react-icons/ri"
import Image from "next/image"
import googlePlayBadge from "@/public/google-play-badge.svg"
import appStoreBadge from "@/public/app-store-badge.svg"
import { disableNavbarWithFooter } from "@/data/disable-navbar-with-footer"
import { usePathname } from "next/navigation"

const footer = {
  browse: ["Home", "Category", "Popular", "Blog"],
  helps: [
    "Contact",
    "privacy and Policy",
    "Term of Services",
    "Term of Use",
    "FAQs",
  ],
}

const Footer = () => {
  const pathname = usePathname()

  return (
    <>
      {!disableNavbarWithFooter.includes(pathname) && (
        <footer className="w-full border-t border-secondary-foreground/10 bg-secondary py-20">
          <MaxWidthWrapper className="grid grid-cols-12 gap-x-10">
            <News className="pr-10" />
            <FooterItem title="Browse" className="col-span-2">
              <div className="flex flex-col gap-3.5">
                {footer.browse.map((c) => (
                  <Link
                    key={c}
                    href="/"
                    className="w-max text-base text-primary hover:underline hover:underline-offset-2"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </FooterItem>
            <FooterItem title="Shop" className="col-span-2">
              <div className="flex flex-col gap-3.5">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.title}
                    href="/"
                    className="w-max text-base text-primary hover:underline hover:underline-offset-2"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </FooterItem>
            <FooterItem title="Bantuan dan Panduan" className="col-span-2">
              <div className="flex flex-col gap-3.5">
                {footer.helps.map((c) => (
                  <Link
                    key={c}
                    href="/"
                    className="w-max text-base text-primary hover:underline hover:underline-offset-2"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </FooterItem>
            <FooterItem title="Download App" className="col-span-2 pl-6">
              <div className="flex flex-col gap-3.5">
                <Link href="/">
                  <Image
                    src={googlePlayBadge}
                    alt="google play badge"
                    className="w-24"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src={appStoreBadge}
                    alt="app store badge"
                    className="w-24"
                  />
                </Link>
              </div>
            </FooterItem>
          </MaxWidthWrapper>
        </footer>
      )}
    </>
  )
}

export default Footer

const FooterItem = ({
  className,
  title,
  children,
}: {
  className?: string
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className={cn("", className)}>
      <h3 className="mb-5 text-lg font-semibold text-primary">{title}</h3>
      {children}
    </div>
  )
}

const News = ({ className }: { className?: string }) => {
  const socialIcon = [
    {
      title: "facebook",
      href: "https://facebook.com",
      icon: <ImFacebook className="text-2xl" />,
    },
    {
      title: "instagram",
      href: "https://instagram.com",
      icon: <IoLogoInstagram className="text-2xl" />,
    },
    {
      title: "twitter x",
      href: "https://twitter.com",
      icon: <RiTwitterXLine className="text-2xl" />,
    },
  ]
  return (
    <div className={cn("col-span-4 flex flex-col", className)}>
      <h1 className="mb-5 text-2xl font-medium uppercase">LAZORA NEWS</h1>
      <p className="mb-5 text-primary">
        Stay update with all the Lazora Tech News, including new products and
        amazing deals.
      </p>
      <div className="relative mb-8 h-max w-full">
        <Mail className="absolute left-2.5 top-1/2 size-6 -translate-y-1/2 stroke-[1.5] text-primary" />
        <Input
          className="h-12 border border-primary bg-transparent px-12 placeholder:capitalize"
          placeholder="enter your email"
          spellCheck="false"
        />
        <ArrowRight className="absolute right-2.5 top-1/2 size-6 -translate-y-1/2 stroke-[1.5] text-primary" />
      </div>
      <FooterItem title="Ikuti Kami" className="mb-10">
        <div className="flex items-center gap-4">
          {socialIcon.map((social) => (
            <a
              href={social.href}
              key={social.title}
              className="flex size-12 items-center justify-center rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20"
            >
              {social.icon}
              <p className="sr-only">{social.title}</p>
            </a>
          ))}
        </div>
      </FooterItem>
      <p className="capitalize text-primary">
        &copy; {new Date().getFullYear()} Lazora, all right reserved.
      </p>
    </div>
  )
}
