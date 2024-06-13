"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import AutoPlay from "embla-carousel-autoplay"
import { getBanners } from "@/services/get-banners"
import { Skeleton } from "./ui/skeleton"
import BannerItem from "./banner-item"
import MaxWidthWrapper from "./max-width-wrapper"

const BannerHomepage = () => {
  const { data, isPending, isError } = getBanners()

  return (
    <MaxWidthWrapper>
      <section className="group mb-20 w-full">
        <Carousel
          plugins={[
            AutoPlay({
              delay: 7000,
            }),
          ]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {isPending ? (
              <CarouselItem>
                <LoadingBanner />
              </CarouselItem>
            ) : isError ? (
              <CarouselItem>
                <Skeleton className="flex h-[450px] w-full items-center justify-center overflow-hidden rounded-xl border-none bg-secondary">
                  <p className="text-lg font-medium">
                    Ada yang salah nih, coba deh refresh lagi
                  </p>
                </Skeleton>
              </CarouselItem>
            ) : (
              data?.map((banner) => (
                <CarouselItem key={banner.title}>
                  <BannerItem {...banner} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          {isPending ? null : (
            <>
              <CarouselPrevious
                className="left-8 size-12 border-none bg-background opacity-0 shadow-md transition-all duration-300 hover:border-none hover:shadow-lg group-hover:-left-6 group-hover:opacity-100"
                classNameIcon="size-6 stroke-[1.5]"
              />
              <CarouselNext
                className="right-8 size-12 border-none bg-background opacity-0 shadow-md transition-all duration-300 hover:border-none hover:shadow-lg group-hover:-right-6 group-hover:opacity-100"
                classNameIcon="size-6 stroke-[1.5]"
              />
            </>
          )}
        </Carousel>
      </section>
    </MaxWidthWrapper>
  )
}

export default BannerHomepage

const LoadingBanner = () => {
  return (
    <Skeleton className="grid h-[450px] w-full grid-cols-12 overflow-hidden rounded-xl border-none bg-secondary">
      <div className="col-span-7 flex items-center pl-20">
        <div className="flex flex-col">
          <div className="mb-4 flex h-max w-full items-center gap-3">
            <Skeleton className="h-8 w-[80px] rounded-full bg-secondary-foreground/10" />
            <Skeleton className="h-8 w-[300px] rounded-full bg-secondary-foreground/10" />
          </div>
          <Skeleton className="mb-12 h-3 w-[250px] rounded-full bg-secondary-foreground/10" />
          <Skeleton className="h-11 w-32 rounded-full bg-secondary-foreground/10" />
        </div>
      </div>
      <div className="col-span-5 flex items-center justify-center">
        <Skeleton className="flex size-[90%] items-center justify-center overflow-hidden rounded-2xl bg-secondary-foreground/10">
          {/* <Skeleton className="size-1/2 bg-secondary-foreground/20" /> */}
        </Skeleton>
      </div>
    </Skeleton>
  )
}
