"use client"

import { formatToIDR } from "@/utils/format-to-idr"
import getproducts from "@/utils/get-products"
import { Category, ImageProduct } from "@prisma/client"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { Toggle } from "./ui/toggle"
import { Heart } from "lucide-react"

const ListProducts = () => {
  const { data, isPending, isError } = getproducts()
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {isPending
        ? "loading data..."
        : isError
        ? "productnya kenapa nih"
        : data?.map(({ id, images, title, categories, price }) => (
            <CardProduct
              key={id + title}
              id={id}
              image={images[0]}
              title={title}
              categories={categories}
              price={price}
            />
          ))}
    </div>
  )
}

export default ListProducts

interface CardProductProps {
  id: string
  image: ImageProduct
  title: string
  categories: Category[]
  price: number
}

const CardProduct = ({
  id,
  image,
  title,
  categories,
  price,
}: CardProductProps) => {
  const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    alert("added to favourite")
  }

  console.log(title.replace(/[^\w\s]/g, ""))

  // 1

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
        // @ts-ignore
        src={image?.image}
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
