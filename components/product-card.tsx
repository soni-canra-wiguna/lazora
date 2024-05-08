import Link from "next/link"
import { Toggle } from "./ui/toggle"
import { Heart } from "lucide-react"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { Category } from "@prisma/client"
import { ImageProps } from "@/types"

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
  const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    alert("added to favourite")
  }

  console.log("image product", image)

  const titleProduct = title
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
  const urlProdcut = `/product/${titleProduct}/${id}`

  return (
    <Link href={urlProdcut} className="flex flex-col relative">
      <Toggle
        onClick={addToFavourite}
        className="absolute z-20 top-4 right-4 bg-secondary/50 hover:bg-secondary/20 rounded-full w-max h-max p-3"
      >
        <Heart
          strokeWidth={1.5}
          className="hover:fill-red-500 hover:stroke-none size-8"
        />
      </Toggle>
      <img
        src={image.image}
        alt={title}
        className="w-full aspect-[9/10] mb-5 hover:brightness-95 transition-all"
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
