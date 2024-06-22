import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { Category } from "@prisma/client"
import { ImageProps } from "@/types"
import { formatTitleProduct } from "@/utils/format-title-product"
import Image from "next/image"
import { forwardRef } from "react"
import { Badge } from "./ui/badge"

interface ProductCardProps {
  id: string
  image: ImageProps
  title: string
  categories: Category[]
  price: number
}

export const ProductCard = ({
  id,
  image,
  title,
  categories,
  price,
}: ProductCardProps) => {
  const titleProduct = formatTitleProduct(title)
  const urlProdcut = `/p/${titleProduct}/${id}`

  return (
    <Link href={urlProdcut} className="relative flex flex-col">
      <Image
        src={image.image ?? ""}
        width={700}
        height={700}
        // placeholder="blur"
        alt={title}
        className="mb-5 aspect-[9/10] w-full object-cover transition-all hover:brightness-95"
      />
      <div className="mb-3 flex items-center gap-1.5">
        {categories?.map(({ title }, index) => (
          <Badge variant="secondary" key={index + title}>
            {title}
          </Badge>
        ))}
      </div>
      <h3 className="mb-1.5 font-semibold">
        <Balancer>
          {title.length > 45 ? title.slice(0, 45) + "..." : title}
        </Balancer>
      </h3>
      <p className="text-base font-medium text-muted-foreground">
        {formatToIDR(price)}
      </p>
    </Link>
  )
}

export const ProductCard2 = ({
  id,
  image,
  title,
  categories,
  price,
}: ProductCardProps) => {
  const titleProduct = formatTitleProduct(title)
  const urlProdcut = `/p/${titleProduct}/${id}`

  return (
    <Link href={urlProdcut} className="relative flex flex-col">
      <Image
        src={image.image ?? ""}
        width={700}
        height={700}
        // placeholder="blur"
        alt={title}
        className="mb-5 aspect-[9/10] w-full object-cover transition-all hover:brightness-95"
      />
      <div className="mb-3 flex items-center gap-1.5">
        {categories?.map(({ title }, index) => (
          <Badge variant="secondary" key={index + title}>
            {title}
          </Badge>
        ))}
      </div>
      <h3 className="mb-1.5 text-base font-semibold">
        <Balancer>
          {title.length > 60 ? title.slice(0, 60) + "..." : title}
        </Balancer>
      </h3>
      <p className="text-base font-medium text-muted-foreground">
        {formatToIDR(price)}
      </p>
    </Link>
  )
}
