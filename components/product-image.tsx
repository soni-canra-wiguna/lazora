import { cn } from "@/lib/utils"
import Image, { ImageProps } from "next/image"

type ProductImageWithRestProps = Omit<
  ImageProps,
  "className" | "src" | "alt" | "width" | "height"
> & {
  parentClassName?: string
  className?: string
  src: string
  alt: string
  width?: number
  height?: number
}

export const ProductImage = ({
  parentClassName,
  className,
  src,
  alt,
  width = 700,
  height = 700,
  ...rest
}: ProductImageWithRestProps) => {
  return (
    <div className={cn("relative mb-5 aspect-[9/10] w-full", parentClassName)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "size-full object-cover opacity-0 transition-all duration-500 hover:brightness-[.80]",
          className,
        )}
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        {...rest}
      />
    </div>
  )
}
