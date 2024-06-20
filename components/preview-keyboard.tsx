"use client"

import getProducts from "@/services/get-products"
import MaxWidthWrapper from "./max-width-wrapper"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { formatTitleProduct } from "@/utils/format-title-product"
import Link from "next/link"
import Image from "next/image"
import { Skeleton } from "./ui/skeleton"

const PreviewKeyboards = () => {
  const { data, isPending, isError } = getProducts()
  const keyboards = data?.filter(
    (product) => product.categories[0].title.toLowerCase() === "keyboard",
  )
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <div className="mb-20 w-full">
        <MaxWidthWrapper className="flex items-center justify-between">
          <h1 className="mb-8 text-3xl font-semibold">keyboard</h1>
          <div className="flex items-center gap-4">
            <CarouselPrevious className="relative left-0 z-30 translate-y-0" />
            <CarouselNext className="relative right-0 z-30 translate-y-0" />
          </div>
        </MaxWidthWrapper>
        <CarouselContent className="-ml-4">
          {isPending ? (
            <LoadingKeyboards />
          ) : (
            keyboards?.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 sm:basis-1/2 md:basis-1/4"
              >
                <Link
                  href={`/p/${formatTitleProduct(item.title)}/${item.id}`}
                  className="h-[500px] w-full overflow-hidden"
                >
                  <Image
                    alt={item.title}
                    src={item.images[0].image ?? ""}
                    width={500}
                    height={500}
                    className="w-full object-cover object-center"
                  />
                </Link>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </div>
    </Carousel>
  )
}

export default PreviewKeyboards

const LoadingKeyboards = () => {
  const loading = Array.from({ length: 5 }, (_, index) => {
    return (
      <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/4">
        <Skeleton className="aspect-[9/14] w-[500px]" />
      </CarouselItem>
    )
  })

  return <>{loading}</>
}
