"use client"

import { ArrowUpToLine } from "lucide-react"
import { usePathname } from "next/navigation"
import { disableNavbarWithFooter } from "@/data/disable-navbar-with-footer"

const BackToTop = () => {
  const pathname = usePathname()
  return (
    <>
      {!disableNavbarWithFooter.includes(pathname) && (
        <div className="fixed bottom-10 right-10 z-30 flex aspect-square size-max items-center justify-center rounded-full bg-primary p-4">
          <ArrowUpToLine className="size-8 text-background" />
        </div>
      )}
    </>
  )
}

export default BackToTop
