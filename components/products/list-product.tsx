"use client"

import { ProductCard } from "@/components/products/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { RootState } from "@/redux/store"
import { ProductDataType, ProductPostProps } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useSelector } from "react-redux"
import { Button } from "../ui/button"

export default function ListProduct() {
  const { value: sortBy } = useSelector((state: RootState) => state.sortBy)
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
    <>
      <div className="grid w-full grid-cols-4 gap-4">
        {isPending ? (
          <LoadingProducts />
        ) : isError ? (
          <Error />
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
    </>
  )
}

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
