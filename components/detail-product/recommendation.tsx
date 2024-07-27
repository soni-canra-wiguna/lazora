"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getShuffleProducts } from "@/services/get-products"
import { ImageProps } from "@/types"
import { formatToIDR } from "@/utils/format-to-idr"
import { Category } from "@prisma/client"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { ProductImage } from "../product-image"
import { URIProduct } from "@/utils/url-product"

export default function Recommendation({
  category,
  id,
}: {
  category: string
  id: string
}) {
  const { inView, ref } = useInView()
  const [isShouldFetch, setIsShouldFetch] = useState<boolean>(false)

  useEffect(() => {
    if (inView) {
      setIsShouldFetch(true)
    }
  }, [inView])

  const { data, isPending, isError } = getShuffleProducts({ isShouldFetch })
  const recommend = data?.filter(
    (product) => product.categories[0].title === category && product.id !== id,
  )

  return (
    <MaxWidthWrapper className="mb-[100px] flex flex-col gap-6">
      <h3 ref={ref} className="text-2xl font-medium capitalize">
        You Might Also Like
      </h3>
      <div className="scrollX flex w-full flex-row gap-4 overflow-x-auto">
        {isPending ? (
          <Loading />
        ) : isError ? (
          <p>something went srong</p>
        ) : (
          recommend
            ?.slice(0, 10)
            .map((product) => (
              <RecommendationCard
                key={product.id}
                id={product.id}
                image={product.images[0]}
                title={product.title}
                categories={product.categories}
                price={product.price}
              />
            ))
        )}
      </div>
    </MaxWidthWrapper>
  )
}

interface RecommendationProps {
  id: string
  image: ImageProps
  title: string
  categories: Category[]
  price: number
}

const RecommendationCard = ({
  id,
  image,
  title,
  categories,
  price,
}: RecommendationProps) => {
  const urlProduct = URIProduct({ title, id })
  return (
    <Link
      href={urlProduct}
      className="relative flex aspect-auto w-[326px] flex-col"
    >
      <ProductImage src={image.image ?? ""} alt={title} />
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

const Loading = () => {
  const loading = Array.from({ length: 4 }, (_, i) => {
    return <Skeleton key={i} className="aspect-[9/11] w-[326px]" />
  })
  return <>{loading}</>
}
