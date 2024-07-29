import { formatToIDR } from "@/utils/format-to-idr"
import { URIProduct } from "@/utils/url-product"
import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

export const SearchResults = ({
  id,
  title,
  image,
  price,
  closeSheet,
}: {
  id: string
  title: string
  image?: string
  price: number
  closeSheet: (isOpen: boolean) => void
}) => {
  const urlProduct = URIProduct({ title, id })

  return (
    <Link
      // @ts-ignore
      onClick={closeSheet}
      href={urlProduct}
      className="flex h-max w-full flex-col"
    >
      <div className="mb-3 h-[260px] w-full">
        <Image
          alt={title}
          src={image ?? ""}
          width={400}
          height={400}
          className="h-full w-full object-contain object-center"
        />
      </div>
      <h3 className="mb-1.5 text-base font-semibold">
        <Balancer>
          {title.length > 60 ? title.slice(0, 60) + "..." : title}
        </Balancer>
      </h3>
      <p className="text-base font-medium text-muted-foreground">
        {formatToIDR(price)}
      </p>
    </Link>
  )
}
