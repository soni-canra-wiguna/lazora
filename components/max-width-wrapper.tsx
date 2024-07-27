import { cn } from "@/lib/utils"
import React from "react"

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 md:px-6 xl:px-8",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper
