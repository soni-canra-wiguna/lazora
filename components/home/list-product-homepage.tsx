"use client"

import { getShuffleProducts } from "@/services/get-products"
import { Button } from "../ui/button"
import { RefreshCcw } from "lucide-react"
import MaxWidthWrapper from "../max-width-wrapper"
import { Skeleton } from "../ui/skeleton"
import { useRouter } from "next/navigation"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { ProductCardProps } from "@/types"
import { formatTitleProduct } from "@/utils/format-title-product"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "../ui/badge"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { ProductImage } from "../product-image"

export default function ListProductHomepage() {
  const { inView, ref } = useInView()
  const [isShouldFetch, setIsShouldFetch] = useState<boolean>(false)

  useEffect(() => {
    if (inView) {
      setIsShouldFetch(true)
    }
  }, [inView])

  const { data, isPending, isError } = getShuffleProducts({ isShouldFetch })

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 ref={ref} className="text-2xl font-medium">
            Products
          </h3>
        </div>
        {isPending ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <Loading />
          </div>
        ) : isError ? (
          <Error />
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {data?.map(({ id, images, title, categories, price }) => (
              <ListProductCard
                key={id + title}
                id={id}
                image={images[0]}
                title={title}
                categories={categories}
                price={price}
              />
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

const ListProductCard = ({
  id,
  image,
  title,
  categories,
  price,
}: ProductCardProps) => {
  const titleProduct = formatTitleProduct(title)
  const urlProdcut = `/p/${titleProduct}/${id}`

  return (
    <Link href={urlProdcut} className="relative flex flex-col">
      <ProductImage src={image.image ?? ""} alt={title} />
      <div className="mb-3 flex items-center gap-1.5">
        {categories?.map(({ title }, index) => (
          <Badge variant="secondary" key={index + title}>
            {title}
          </Badge>
        ))}
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

const Loading = () => {
  const loading = Array.from({ length: 8 }, (_, i) => {
    return <Skeleton key={i} className="aspect-[9/10] w-full" />
  })

  return <>{loading}</>
}

const Error = () => {
  const router = useRouter()

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        koneksi internet kamu lambat nih, coba refresh lagi
        <Button
          onClick={() => router.refresh()}
          className="w-max"
          size="lg"
          variant="secondary"
        >
          refresh
          <RefreshCcw className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  )
}
