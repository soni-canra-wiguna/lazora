"use client"

import MaxWidthWrapper from "@/components/layouts/max-width-wrapper"
import { Skeleton } from "@/components/ui/skeleton"
import { getShuffleProducts } from "@/services/get-products"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { ProductCard } from "../cards/product-card"

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
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.images[0]}
                title={product.title}
                categories={product.categories}
                price={product.price}
                sliceLength={60}
                className="aspect-auto w-[326px]"
              />
            ))
        )}
      </div>
    </MaxWidthWrapper>
  )
}

const Loading = () => {
  const loading = Array.from({ length: 4 }, (_, i) => {
    return <Skeleton key={i} className="aspect-[9/11] w-[326px]" />
  })
  return <>{loading}</>
}
