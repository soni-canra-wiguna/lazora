"use client"

import { ImageProps } from "@/types"
import Image from "next/image"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import ShareProduct from "./share-product"
import { useQueryState, parseAsInteger } from "nuqs"
import { Skeleton } from "../ui/skeleton"
import { handleOnLoadImage } from "@/utils/on-load-image"

interface ImageProductProps {
  images: ImageProps[]
  title: string
  price: number
  indexImage: number
}

export default function ImageProduct({
  images,
  title,
  price,
}: Pick<ImageProductProps, "images" | "title" | "price">) {
  const [indexImage, setIndexImage] = useQueryState(
    "indexImage",
    parseAsInteger.withDefault(0),
  )

  return (
    <div className="sticky top-32 flex h-[620px] w-full flex-1 items-start gap-4">
      <div className="grid w-[60px] grid-cols-1 gap-4">
        {images.map(({ image }, index) => (
          <div
            key={index}
            onClick={() => setIndexImage(index)}
            className={cn(
              "aspect-square w-full cursor-pointer overflow-hidden border border-border/40 bg-secondary transition-all selection:bg-transparent hover:brightness-75",
              index == (indexImage || 0) &&
                "border-primary brightness-75 hover:brightness-75",
            )}
          >
            <Image
              src={image ?? ""}
              alt={title}
              width={300}
              height={300}
              className="size-full object-cover object-center opacity-0 transition-opacity duration-300"
              onLoad={handleOnLoadImage}
              priority
            />
          </div>
        ))}
      </div>
      <ModalImageSlider
        images={images}
        title={title}
        indexImage={indexImage}
        price={price}
      />
    </div>
  )
}

const DialogClose = DialogPrimitive.Close

const ModalImageSlider = ({
  images,
  title,
  indexImage,
  price,
}: ImageProductProps) => {
  return (
    <div className="relative size-full flex-1 overflow-hidden selection:bg-transparent">
      <Image
        src={images[indexImage || 0].image ?? ""}
        alt={title}
        fill
        className="size-full object-cover object-center opacity-0 transition-opacity duration-1000"
        onLoad={handleOnLoadImage}
        priority
        unoptimized
      />

      <div className="absolute right-4 top-4 flex flex-col items-center gap-4">
        <ShareProduct
          image={images[0].image ?? ""}
          title={title}
          price={price}
        />
        <ZoomInImage images={images} title={title} indexImage={indexImage} />
      </div>
    </div>
  )
}

const ZoomInImage = ({
  images,
  title,
  indexImage,
}: Pick<ImageProductProps, "images" | "title" | "indexImage">) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          title="Zoom In"
          className="group flex size-12 items-center justify-center rounded-full bg-background transition-all duration-300 hover:bg-primary"
        >
          <ZoomIn
            strokeWidth={1.5}
            className="size-6 text-primary transition-all duration-300 group-hover:text-background"
          />
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-screen h-screen w-screen overflow-hidden p-0"
        closeIcon={false}
      >
        <Carousel
          opts={{
            loop: true,
            startIndex: indexImage,
          }}
          className="mx-auto h-full w-full max-w-[80%]"
        >
          <CarouselContent classNameParent="h-full">
            {images.map((image) => (
              <CarouselItem
                key={image.id}
                className="relative flex h-screen w-full items-center selection:bg-transparent"
              >
                <Image
                  alt={title}
                  src={image.image ?? ""}
                  fill
                  className="object-contain opacity-0 transition-opacity duration-1000"
                  onLoad={handleOnLoadImage}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* button slide */}
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-5">
            <CarouselPrevious
              className="group relative -left-0 flex size-12 transform-none items-center justify-center rounded-full border-none bg-background shadow-md transition-all duration-300 hover:border-none hover:bg-primary"
              classNameIcon="size-6 group-hover:text-background transition-all duration-300"
            />
            <DialogClose className="group flex size-12 items-center justify-center rounded-full bg-background shadow-md transition-all duration-300 hover:bg-primary">
              <X className="size-6 text-primary transition-all duration-300 group-hover:text-background" />
            </DialogClose>
            <CarouselNext
              className="group relative -right-0 flex size-12 transform-none items-center justify-center rounded-full border-none bg-background shadow-md transition-all duration-300 hover:border-none hover:bg-primary"
              classNameIcon="size-6 group-hover:text-background transition-all duration-300"
            />
          </div>
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}

export const SuspenseImageProduct = () => {
  return (
    <div className="sticky top-32 flex h-[620px] w-full flex-1 items-start gap-4">
      <div className="grid w-[60px] grid-cols-1 gap-4">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="aspect-square w-full" />
      </div>
      <div className="relative size-full flex-1 overflow-hidden selection:bg-transparent">
        <Skeleton className="size-full" />
      </div>
    </div>
  )
}
