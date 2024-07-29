"use client"

import MaxWidthWrapper from "@/components/layouts/max-width-wrapper"
import Link from "next/link"
import Image from "next/image"
import googlePlayBadge from "@/public/google-play-badge.svg"
import appStoreBadge from "@/public/app-store-badge.svg"
import { disableNavbarWithFooter } from "@/constants/disable-navbar-with-footer"
import { usePathname } from "next/navigation"
import { FOOTER_ITEMS } from "@/constants/footer-items"
import { FooterItem } from "./footer-item"
import { NewsSection } from "./news-section"

const Footer = () => {
  const pathname = usePathname()

  return (
    <>
      {!disableNavbarWithFooter.includes(pathname) && (
        <footer className="w-full border-t border-secondary-foreground/10 bg-secondary py-20">
          <MaxWidthWrapper className="grid grid-cols-12 gap-x-10">
            <NewsSection className="pr-10" />
            <FooterItem title="Browse" className="col-span-2">
              <div className="flex flex-col gap-3.5">
                {FOOTER_ITEMS.browse.map((browse) => (
                  <Link
                    key={browse.label}
                    href={browse.href}
                    className="w-max text-base capitalize text-primary hover:underline hover:underline-offset-2"
                  >
                    {browse.label}
                  </Link>
                ))}
              </div>
            </FooterItem>
            <FooterItem title="Shop" className="col-span-2">
              <div className="flex flex-col gap-3.5">
                {FOOTER_ITEMS.categories.map((category) => (
                  <Link
                    key={category.label}
                    href={category.href}
                    className="w-max text-base capitalize text-primary hover:underline hover:underline-offset-2"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </FooterItem>
            <FooterItem title="Help and Guide" className="col-span-2">
              <div className="flex flex-col gap-3.5">
                {FOOTER_ITEMS.helps.map((help) => (
                  <Link
                    key={help.label}
                    href={help.href}
                    className="w-max text-base text-primary hover:underline hover:underline-offset-2"
                  >
                    {help.label}
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
