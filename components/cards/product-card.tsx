import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { ProductCardProps } from "@/types"
import { Badge } from "../ui/badge"
import { ProductImage } from "../product-image"
import { URIProduct } from "@/utils/url-product"
import { cn } from "@/lib/utils"

interface ProductCartType extends ProductCardProps {
  className?: string
  sliceLength?: number
}

export const ProductCard = ({
  id,
  image,
  title,
  categories,
  price,
  className,
  sliceLength = 45,
}: ProductCartType) => {
  const urlProduct = URIProduct({ title, id })

  return (
    <Link href={urlProduct} className={cn("relative flex flex-col", className)}>
      <ProductImage src={image.image ?? ""} alt={title} />
      <div className="mb-3 flex items-center gap-1.5">
        {categories?.map(({ title }, index) => (
          <Badge variant="secondary" key={index + title}>
            {title}
          </Badge>
        ))}
      </div>
      <h3 className="mb-1.5 font-semibold">
        <Balancer>
          {title.length > 45 ? title.slice(0, sliceLength) + "..." : title}
        </Balancer>
      </h3>
      <p className="text-base font-medium text-muted-foreground">
        {formatToIDR(price)}
      </p>
    </Link>
  )
}
