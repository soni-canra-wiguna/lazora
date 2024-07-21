"use client"

import { ImageProps } from "@/types"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Share2, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "../ui/use-toast"
import ShareProduct from "./share-product"

interface ImageProductProps {
  images: ImageProps[]
  title: string
  price: number
}

export default function ImageProduct({
  images,
  title,
  price,
}: ImageProductProps) {
  const [indexImage, setIndexImage] = useState(0)
  // const router = useRouter()
  // const searchParam = useSearchParams()
  // const param: any = searchParam.get("indexImg" || null)

  // const handleTabsImage = (index: number) => {
  //   router.prefetch(`?indexImg=${index}`)
  //   router.push(`?indexImg=${index}`)
  // }

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
              width={400}
              height={400}
              className="size-full object-cover object-center opacity-0 transition-opacity duration-300"
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
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

type ModalImageSliderType = ImageProductProps & {
  indexImage: number
}

const ModalImageSlider = ({
  images,
  title,
  indexImage,
  price,
}: ModalImageSliderType) => {
  return (
    <div className="relative size-full flex-1 overflow-hidden selection:bg-transparent">
      <Image
        src={images[indexImage || 0].image ?? ""}
        alt={title}
        fill
        className="size-full object-cover object-center opacity-0 transition-opacity duration-1000"
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
      />

      <div className="absolute right-4 top-4 flex flex-col items-center gap-4">
        <ShareProduct
          image={images[0].image ?? ""}
          title={title}
          price={price}
        />
        <ZoomInImage images={images} title={title} />
      </div>
    </div>
  )
}

// const ShareProducts = () => {
//   return (
//     <button
//       onClick={() =>
//         toast({
//           title: "building process...",
//         })
//       }
//       title="share product"
//       className="group flex size-12 items-center justify-center rounded-full bg-background transition-all duration-300 hover:bg-primary"
//     >
//       <Share2
//         strokeWidth={1.5}
//         className="size-6 text-primary transition-all duration-300 group-hover:text-background"
//       />
//     </button>
//   )
// }

const ZoomInImage = ({
  images,
  title,
}: {
  images: ImageProps[]
  title: string
}) => {
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
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
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
