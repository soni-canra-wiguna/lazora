"use client"

import FilterSidebar from "@/components/filter-sidebar"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { ProductCard } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { getDataProduct } from "@/services/get-products"
import { ProductDataType } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const ProductsPage = () => {
  const { data: dataProduct, isPending: pendingTotalProduct } = getDataProduct()
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
    queryKey: ["product page"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data }: { data: ProductDataType } = await axios.get(
        `/api/products?page=${+pageParam}&limit=${10}`
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
    <MaxWidthWrapper className="mt-32 min-h-screen flex items-start gap-4">
      <FilterSidebar />
      <div className="w-5/6 h-full flex flex-col">
        <h2 className="capitalize text-xl font-semibold mb-3 flex items-center">
          products(
          {pendingTotalProduct ? (
            <Skeleton className="h-5 w-6 inline-block" />
          ) : (
            dataProduct?.totalProducts
          )}
          )
        </h2>
        <div className="w-full grid grid-cols-4 gap-4">
          {isPending ? (
            <LoadingProducts />
          ) : (
            isSuccess &&
            data?.pages?.map((page) => {
              return page.products?.map((data) => (
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
            })
          )}
        </div>
        <div
          ref={ref}
          className="flex items-center justify-center w-full mt-4 mb-8"
        >
          {isFetchingNextPage && (
            <p className="flex items-center gap-2">
              <Loader2 className="size-4 text-primary animate-spin" /> Load
              more...
            </p>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductsPage

const LoadingProducts = () => {
  const loading = Array.from({ length: 9 }, (_, index) => {
    return (
      <div key={index} className="size-full">
        <Skeleton className="w-full aspect-[9/10] mb-5" />
      </div>
    )
  })
  return <>{loading}</>
}
