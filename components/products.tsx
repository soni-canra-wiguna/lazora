"use client"

import { getShuffleProducts } from "@/services/get-products"
import { ProductCard2 } from "./product-card"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ChevronDown, RefreshCcw } from "lucide-react"
import MaxWidthWrapper from "./max-width-wrapper"
import { Skeleton } from "./ui/skeleton"
import { useRouter } from "next/navigation"

const ListProducts = () => {
  const { data, isPending, isError } = getShuffleProducts()
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium">Products</h3>
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-full">
                Sort by <ChevronDown className="ml-2 size-4" />{" "}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="rounded-none shadow-none">
              price
            </PopoverContent>
          </Popover> */}
        </div>
        {/* <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"> */}
        {isPending ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <Loading />
          </div>
        ) : isError ? (
          <Error />
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {data?.map(({ id, images, title, categories, price }) => (
              <ProductCard2
                key={id + title}
                id={id}
                image={images[0]}
                title={title}
                categories={categories}
                price={price}
              />
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

export default ListProducts

const Loading = () => {
  const loading = Array.from({ length: 8 }, (_, i) => {
    return <Skeleton className="aspect-[9/10] w-full" />
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
