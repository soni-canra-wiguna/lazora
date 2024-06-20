"use client"

import FilterSidebar from "@/components/filter-sidebar"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { ProductCard } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { CATEGORIES } from "@/data/categories"
import { getDataProduct } from "@/services/get-products"
import { ProductDataType, ProductPostProps } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const ProductsPage = () => {
  const { data: dataProduct, isPending: pendingTotalProduct } = getDataProduct()
  const [sortBy, setSortBy] = useState("featured")
  const { ref, inView } = useInView()
  const {
    data,
    isPending,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["product page", sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      const { data }: { data: ProductDataType } = await axios.get(
        `/api/products?sortBy=${sortBy}&page=${+pageParam}&limit=${10}`,
      )
      return data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1
      }
      return undefined
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <MaxWidthWrapper className="mt-32 flex min-h-screen items-start gap-4">
      <FilterSidebar sortBy={sortBy} setSortBy={setSortBy} />
      <div className="flex h-full w-5/6 flex-col">
        <h2 className="mb-3 flex items-center text-xl font-semibold capitalize">
          products(
          {pendingTotalProduct ? (
            <Skeleton className="inline-block h-5 w-6" />
          ) : (
            dataProduct?.totalProducts
          )}
          )
        </h2>
        <div className="grid w-full grid-cols-4 gap-4">
          {isPending ? (
            <LoadingProducts />
          ) : (
            isSuccess &&
            data?.pages?.map((page, index) => (
              <ListProductInfinite key={index} products={page?.products} />
            ))
          )}
        </div>
        <div
          ref={ref}
          className="mb-8 mt-4 flex w-full items-center justify-center"
        >
          {isFetchingNextPage && (
            <p className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-primary" /> Load
              more...
            </p>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductsPage

const ListProductInfinite = ({
  products,
}: {
  products: ProductPostProps[]
}) => {
  const product = products?.map((data) => (
    <ProductCard
      // ref={ref}
      key={data.id}
      id={data.id}
      image={data.images[0]}
      title={data.title}
      categories={data.categories}
      price={data.price}
    />
  ))

  return <>{product}</>
}

const LoadingProducts = () => {
  const loading = Array.from({ length: 9 }, (_, index) => {
    return (
      <div key={index} className="size-full">
        <Skeleton className="mb-5 aspect-[9/10] w-full" />
      </div>
    )
  })
  return <>{loading}</>
}
