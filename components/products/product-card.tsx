import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { ProductCardProps } from "@/types"
import { formatTitleProduct } from "@/utils/format-title-product"
import { Badge } from "../ui/badge"
import { ProductImage } from "../product-image"

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
          {title.length > 45 ? title.slice(0, 45) + "..." : title}
        </Balancer>
      </h3>
      <p className="text-base font-medium text-muted-foreground">
        {formatToIDR(price)}
      </p>
    </Link>
  )
}
