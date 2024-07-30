import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { formatTitleProduct } from "@/utils/format-title-product"

interface FormWrapperProps {
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
}: FormWrapperProps) => {
  const href = `/${formatTitleProduct(href_title ?? "")}`

  return (
    <div
      className={cn(
        "col-span-12 mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center gap-4 bg-background lg:col-span-4 lg:px-12",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5 self-start pb-6">
        <h4 className="font-canelaLight text-3xl">{title}</h4>
        <p className="text-sm text-[#303030]">{desc}</p>
      </div>
      {/* this children is form submit */}
      {children}
      <p className="pt-10 text-sm text-[#303030]">
        {desc_href}?{" "}
        <Link className="capitalize text-main hover:underline" href={href}>
          {href_title}
        </Link>
      </p>
    </div>
  )
}

export default FormWrapper
