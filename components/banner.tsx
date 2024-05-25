"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import AutoPlay from "embla-carousel-autoplay"
import test from "@/public/moi.png"
import Balancer from "react-wrap-balancer"
import { ArrowRight, Coffee } from "lucide-react"
import Link from "next/link"
import { getBanners } from "@/services/get-banners"
import { Skeleton } from "./ui/skeleton"
import BannerItem from "./banner-item"

const BannerHomepage = () => {
  const { data, isPending, isError } = getBanners()

  return (
    <section className="w-full mb-20 group">
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
              <Skeleton className="w-full h-[450px] border-none rounded-xl flex items-center justify-center overflow-hidden bg-secondary">
                <p className="font-medium text-lg">
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
              className="left-8 size-12 bg-background opacity-0 group-hover:opacity-100 group-hover:-left-6 transition-all duration-300 border-none hover:border-none shadow-md hover:shadow-lg"
              classNameIcon="size-6 stroke-[1.5]"
            />
            <CarouselNext
              className="right-8 size-12 bg-background opacity-0 group-hover:opacity-100 group-hover:-right-6 transition-all duration-300 border-none hover:border-none shadow-md hover:shadow-lg"
              classNameIcon="size-6 stroke-[1.5]"
            />
          </>
        )}
      </Carousel>
    </section>
  )
}

export default BannerHomepage

const LoadingBanner = () => {
  return (
    <Skeleton className="w-full h-[450px] border-none rounded-xl grid grid-cols-12 overflow-hidden bg-secondary">
      <div className="col-span-7 flex items-center pl-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4 w-full h-max">
            <Skeleton className="w-[80px] h-8 rounded-full bg-secondary-foreground/10" />
            <Skeleton className="w-[300px] h-8 rounded-full bg-secondary-foreground/10" />
          </div>
          <Skeleton className="w-[250px] h-3 rounded-full bg-secondary-foreground/10 mb-12" />
          <Skeleton className="w-32 h-11 rounded-full bg-secondary-foreground/10" />
        </div>
      </div>
      <div className="col-span-5 flex items-center justify-center">
        <Skeleton className="size-[90%] rounded-2xl overflow-hidden flex items-center justify-center bg-secondary-foreground/10">
          {/* <Skeleton className="size-1/2 bg-secondary-foreground/20" /> */}
        </Skeleton>
      </div>
    </Skeleton>
  )
}
