// @ts-nocheck
"use client"

import { ImageProduct as ImageProductType } from "@prisma/client"

interface ImageProductProps {
  images: ImageProductType[]
  title: string
}

const ImageProduct = ({ images, title }: ImageProductProps) => {
  return (
    <div className="flex-1 sticky top-32 flex gap-4 items-start w-full h-[620px]">
      <div className="w-[60px] grid grid-cols-1 gap-4">
        {images.map(({ image }, index) => (
          <div
            key={index}
            className="w-full aspect-square bg-secondary border border-border/40"
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
          src={images[0].image}
          alt={title}
          className="size-full object-cover object-center"
        />
      </div>
    </div>
  )
}

export default ImageProduct
