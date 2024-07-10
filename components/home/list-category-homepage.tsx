import Link from "next/link"
import MaxWidthWrapper from "../max-width-wrapper"
import { CATEGORIES } from "@/constants/categories"
import { Card } from "../ui/card"
import Image from "next/image"
import { formatTitleProduct } from "@/utils/format-title-product"

export default function ListCategoryHomepage() {
  return (
    <MaxWidthWrapper className="mb-20 grid grid-cols-5 gap-4">
      {CATEGORIES.map((c, index) => {
        const url = `/c/${formatTitleProduct(c.value)}`
        return (
          <Link
            href={url}
            className="group inline-block overflow-hidden"
            key={index}
          >
            <Card className="relative flex aspect-[14/8] w-full items-center justify-center overflow-hidden rounded-xl border-none bg-secondary transition-all duration-300 hover:bg-secondary-foreground/10">
              <h3 className="z-20 font-canelaLight capitalize tracking-wide transition-all duration-300 group-hover:-translate-x-16">
                {c.title}
              </h3>
              <div className="absolute right-0 top-1/2 aspect-square w-[200px] -translate-y-1/2 translate-x-52 transition-all duration-300 group-hover:translate-x-14">
                <Image
                  width={500}
                  height={500}
                  alt={c.title}
                  src={c.image}
                  className="size-full object-center grayscale"
                />
              </div>
            </Card>
          </Link>
        )
      })}
    </MaxWidthWrapper>
  )
}
