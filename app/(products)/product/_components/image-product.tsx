"use client"

import { ImageProps } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"

interface ImageProductProps {
  images: ImageProps[]
  title: string
}

const ImageProduct = ({ images, title }: ImageProductProps) => {
  const router = useRouter()
  const searchParam = useSearchParams()
  const param: any = searchParam.get("indexImg" || null)

  const handleTabsImage = (index: number) => {
    router.prefetch(`/?indexImg=${index}`)
    router.push(`?indexImg=${index}`)
  }

  return (
    <div className="flex-1 sticky top-32 flex gap-4 items-start w-full h-[620px]">
      <div className="w-[60px] grid grid-cols-1 gap-4">
        {images.map(({ image }, index) => (
          <div
            key={index}
            onClick={() => handleTabsImage(index)}
            className={`${
              index == (param || 0) &&
              "hover:brightness-75 brightness-75 border-primary"
            } transition-all hover:brightness-75 cursor-pointer w-full aspect-square bg-secondary border border-border/40`}
          >
            <img
              src={image}
              alt={title}
              className="size-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="size-full flex-1">
        <img
          src={images[param || 0].image}
          alt={title}
          className="size-full object-cover object-center"
        />
      </div>
    </div>
  )
}

export default ImageProduct
