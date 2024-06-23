"use client"

import { ArrowUpToLine } from "lucide-react"
import { usePathname } from "next/navigation"
import { disableNavbarWithFooter } from "@/data/disable-navbar-with-footer"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  const toggleVisibility = () => {
    if (window.scrollY > 700) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <>
      {!disableNavbarWithFooter.includes(pathname) && (
        <div
          onClick={scrollToTop}
          className={cn(
            "invisible fixed bottom-10 right-10 z-30 flex aspect-square size-max cursor-pointer items-center justify-center rounded-full bg-primary p-4 opacity-0 transition-all duration-300 hover:bg-primary/80 active:scale-95",
            isVisible && "visible opacity-100",
          )}
        >
          <ArrowUpToLine className="size-6 text-background" />
        </div>
      )}
    </>
  )
}

export default BackToTop
