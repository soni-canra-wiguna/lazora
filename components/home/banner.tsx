"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import AutoPlay from "embla-carousel-autoplay"
import { getBanners } from "@/services/get-banners"
import { Skeleton } from "../ui/skeleton"
import MaxWidthWrapper from "../max-width-wrapper"
import { BannerProps } from "@/types"
import Balancer from "react-wrap-balancer"
import { Card } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function BannerHomepage() {
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
                <Skeleton className="flex h-[450px] w-full items-center justify-center overflow-hidden border-none bg-secondary">
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
              <CarouselButton type="previous" />
              <CarouselButton type="next" />
            </>
          )}
        </Carousel>
      </section>
    </MaxWidthWrapper>
  )
}

const CarouselButton = ({
  type,
  className,
}: {
  type: "previous" | "next"
  className?: string
}) => {
  if (type === "previous") {
    return (
      <CarouselPrevious
        className={cn(
          "left-8 size-12 border-none bg-background opacity-0 shadow-md transition-all duration-300 hover:border-none hover:shadow-lg group-hover:-left-6 group-hover:opacity-100",
          className,
        )}
        classNameIcon="size-6 stroke-[1.5]"
      />
    )
  }
  if (type === "next") {
    return (
      <CarouselNext
        className={cn(
          "right-8 size-12 border-none bg-background opacity-0 shadow-md transition-all duration-300 hover:border-none hover:shadow-lg group-hover:-right-6 group-hover:opacity-100",
          className,
        )}
        classNameIcon="size-6 stroke-[1.5]"
      />
    )
  }
}

export const BannerItem = ({
  title,
  description,
  background_color,
  title_button,
  href_button,
  image,
  alt_image,
}: BannerProps) => {
  return (
    <Card
      style={{
        backgroundColor: background_color,
      }}
      className="grid h-[450px] w-full grid-cols-12 overflow-hidden border-none"
    >
      <div className="col-span-7 flex items-center pl-20">
        <div className="flex flex-col">
          <h1 className="mb-4 font-canelaRegular text-6xl capitalize selection:bg-transparent">
            <Balancer>{title}</Balancer>
          </h1>
          <p className="mb-6">{description}</p>
          <Link href={href_button} className="size-max">
            <Button
              size="lg"
              className="shimmer w-max rounded-full font-canelaThin capitalize"
            >
              {title_button}
              <ArrowRight className="ml-2 size-4 stroke-[1.5] text-inherit" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="col-span-5 flex items-center justify-center overflow-hidden">
        <div className="flex size-[90%] items-center justify-center overflow-hidden rounded-2xl selection:bg-transparent">
          <Image
            src={image || ""}
            width={600}
            height={600}
            alt={alt_image}
            className="size-full object-scale-down object-center opacity-0 transition-opacity duration-500"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>
      </div>
    </Card>
  )
}

const LoadingBanner = () => {
  return (
    <Skeleton className="grid h-[450px] w-full grid-cols-12 overflow-hidden border-none bg-secondary">
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
        <Skeleton className="flex size-[90%] items-center justify-center overflow-hidden rounded-2xl bg-secondary-foreground/10" />
      </div>
    </Skeleton>
  )
}
