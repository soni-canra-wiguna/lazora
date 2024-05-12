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

const BannerHomepage = () => {
  return (
    <section className="w-full mb-20 group">
      <Carousel
        // plugins={[
        //   AutoPlay({
        //     delay: 7000,
        //   }),
        // ]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          <CarouselItem>
            <Card className="w-full h-[450px] border-none bg-red-200 rounded-xl grid grid-cols-12 overflow-hidden">
              <div className="col-span-7 flex items-center pl-20">
                <div className="flex flex-col">
                  <h1 className="text-6xl font-canelaRegular mb-4 capitalize">
                    <Balancer>free shipping now!!</Balancer>
                  </h1>
                  <p className="mb-6">special new product, free shipping!!</p>
                  <Button
                    size="lg"
                    className="capitalize w-max rounded-full font-canelaThin shimmer"
                  >
                    buy now{" "}
                    <ArrowRight className="text-inherit size-4 ml-2 stroke-[1.5]" />
                  </Button>
                </div>
              </div>
              <div className="col-span-5 flex items-center justify-center">
                <div className="size-[90%]">
                  <Image
                    src={test}
                    alt="teee"
                    className="size-full object-contain object-center"
                  />
                </div>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="w-full h-[450px] border-none bg-lime-200 rounded-xl grid grid-cols-12 overflow-hidden">
              <div className="col-span-7 flex items-center pl-20">
                <div className="flex flex-col">
                  <h1 className="text-6xl font-canelaRegular mb-4 capitalize">
                    <Balancer>thumbler 360 extraordinary privileges</Balancer>
                  </h1>
                  <p className="mb-6">
                    new product, thumbler 360 extraordinary privileges!!
                  </p>
                  <Button
                    size="lg"
                    className="capitalize w-max rounded-full font-canelaThin shimmer"
                  >
                    buy now{" "}
                    <ArrowRight className="text-inherit size-4 ml-2 stroke-[1.5]" />
                  </Button>
                </div>
              </div>
              <div className="col-span-5 flex items-center justify-center">
                <div className="size-[90%]">
                  <Coffee className="size-[100px] text-primary stroke-2" />
                  {/* <Image
                    src={test}
                    alt="teee"
                    className="size-full object-contain object-center"
                  /> */}
                </div>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="w-full h-[450px] border-none bg-yellow-200 rounded-xl grid grid-cols-12 overflow-hidden">
              <div className="col-span-7 flex items-center pl-20">
                <div className="flex flex-col">
                  <h1 className="text-6xl font-canelaRegular mb-4 capitalize">
                    <Balancer>special product and discount 20%!!</Balancer>
                  </h1>
                  <p className="mb-6">
                    get discount if you buy minimum price, see for more
                    iformation
                  </p>
                  <Button
                    size="lg"
                    className="capitalize w-max rounded-full font-canelaThin shimmer"
                  >
                    buy now{" "}
                    <ArrowRight className="text-inherit size-4 ml-2 stroke-[1.5]" />
                  </Button>
                </div>
              </div>
              <div className="col-span-5 flex items-center justify-center">
                <Image
                  src={test}
                  alt="teee"
                  className="size-full object-cover object-center"
                />
              </div>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          className="left-8 size-12 bg-background opacity-0 group-hover:opacity-100 group-hover:-left-6 transition-all duration-300 border-none hover:border-none shadow-md hover:shadow-lg"
          classNameIcon="size-6 stroke-[1.5]"
        />
        <CarouselNext
          className="right-8 size-12 bg-background opacity-0 group-hover:opacity-100 group-hover:-right-6 transition-all duration-300 border-none hover:border-none shadow-md hover:shadow-lg"
          classNameIcon="size-6 stroke-[1.5]"
        />
      </Carousel>
    </section>
  )
}

export default BannerHomepage
