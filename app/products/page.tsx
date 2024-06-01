"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import ProductCard from "@/components/product-card"
import { getShuffleProducts } from "@/services/get-products"
import { ProductPostProps } from "@/types"
import { shuffleArrayProducts } from "@/utils/shuffle-array-products"
import { Product } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface ProductPage {
  message: string
  products: ProductPostProps[]
  currentPage: number
  totalPages: number
  totalItems: number
  totalProducts: number
  status: number
}

const ProductsPage = () => {
  // const { data, isPending, isError } = getShuffleProducts()
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
      const { data }: { data: ProductPage } = await axios.get(
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
    <MaxWidthWrapper className="mt-32 min-h-screen grid grid-cols-12">
      <div className="col-span-3 w-full bg-secondary">sidebar filter</div>
      <div className="col-span-9 w-full grid grid-cols-3 gap-4">
        {isPending ? (
          <p>loading...</p>
        ) : (
          isSuccess &&
          data?.pages?.map((page) => {
            return page.products.map((data) => (
              <ProductCard
                ref={ref}
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
        <div>{isFetchingNextPage && "load more data"}</div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductsPage
