import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { Category } from "@prisma/client"
import { ImageProps } from "@/types"
import { formatTitleProduct } from "@/utils/format-title-product"
import Image from "next/image"

interface ProductCardProps {
  id: string
  image: ImageProps
  title: string
  categories: Category[]
  price: number
}

const ProductCard = ({
  id,
  image,
  title,
  categories,
  price,
}: ProductCardProps) => {
  const titleProduct = formatTitleProduct(title)
  const urlProdcut = `/product/${titleProduct}/${id}`

  return (
    <Link href={urlProdcut} className="flex flex-col relative">
      <Image
        src={image.image ?? ""}
        width={700}
        height={700}
        // placeholder="blur"
        alt={title}
        className="w-full aspect-[9/10] mb-5 hover:brightness-95 transition-all object-cover"
      />
      <div className="flex gap-1.5 items-center mb-3">
        {categories?.map(({ title }, index) => (
          <p
            key={title + index}
            className="text-sm font-medium text-muted-foreground"
          >
            {title}
          </p>
        ))}
      </div>
      <h3 className="font-semibold text-xl mb-1.5">
        <Balancer>{title}</Balancer>
      </h3>
      <p className="text-base font-medium text-muted-foreground">
        {formatToIDR(price)}
      </p>
    </Link>
  )
}

export default ProductCard
