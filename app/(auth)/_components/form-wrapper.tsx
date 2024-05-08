import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface FormWrapperPorps {
  className?: string
  children: React.ReactNode
  title: string
  desc?: string
  href_title?: string
  desc_href?: string
}

const FormWrapper = ({
  className,
  children,
  title,
  desc,
  desc_href,
  href_title,
}: FormWrapperPorps) => {
  const href = "/" + href_title?.toLowerCase().replace(/\s+/g, "-")

  return (
    <div
      className={cn(
        "col-span-12 lg:col-span-4 h-full flex items-center justify-center gap-4 flex-col bg-background lg:px-12 max-w-lg mx-auto w-full",
        className
      )}
    >
      <div className="self-start flex flex-col gap-1.5 pb-6">
        <h4 className="text-3xl font-canelaLight">{title}</h4>
        <p className="text-[#303030] text-sm">{desc}</p>
      </div>
      {/* this children is form submit */}
      {children}
      <p className="text-[#303030] text-sm pt-10">
        {desc_href}?{" "}
        <Link className="hover:underline text-main capitalize" href={href}>
          {href_title}
        </Link>
      </p>
    </div>
  )
}

export default FormWrapper
