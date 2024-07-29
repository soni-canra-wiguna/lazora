"use client"

import { getShuffleProducts } from "@/services/get-products"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import MaxWidthWrapper from "@/components/layouts/max-width-wrapper"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { ProductCard } from "../cards/product-card"

export default function ListProductHomepage() {
  const { inView, ref } = useInView()
  const [isShouldFetch, setIsShouldFetch] = useState<boolean>(false)

  useEffect(() => {
    if (inView) {
      setIsShouldFetch(true)
    }
  }, [inView])

  const { data, isPending, isError } = getShuffleProducts({ isShouldFetch })

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 ref={ref} className="text-2xl font-medium">
            Products
          </h3>
        </div>
        {isPending ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <Loading />
          </div>
        ) : isError ? (
          <Error />
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {data?.map(({ id, images, title, categories, price }) => (
              <ProductCard
                key={id + title}
                id={id}
                image={images[0]}
                title={title}
                categories={categories}
                price={price}
                sliceLength={60}
              />
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

const Loading = () => {
  const loading = Array.from({ length: 8 }, (_, i) => {
    return <Skeleton key={i} className="aspect-[9/10] w-full" />
  })

  return <>{loading}</>
}

const Error = () => {
  const router = useRouter()

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        koneksi internet kamu lambat nih, coba refresh lagi
        <Button
          onClick={() => router.refresh()}
          className="w-max"
          size="lg"
          variant="secondary"
        >
          refresh
          <RefreshCcw className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  )
}
