//@ts-nocheck
"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { formatToIDR } from "@/utils/format-to-idr"
import { getSingleProduct } from "@/utils/get-products"
import { Heart, ShoppingCart } from "lucide-react"
import Balancer from "react-wrap-balancer"
import parse from "html-react-parser"
// import { useSearchParams } from 'next/navigation'

const SingleProductPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params
  console.log(slug[1])
  // const params = useSearchParams()
  // const productId: string | null = params.get("productId" || null)
  const { data, isPending, isError } = getSingleProduct(slug[1])

  console.log(data?.images)

  if (isPending) return <p>loading...</p>
  if (isError) return <p>error</p>

  return (
    <MaxWidthWrapper className="pt-24 flex flex-col gap-20 max-w-7xl">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-5">
          <img
            src={data?.images[0].image}
            alt={data?.title}
            className="w-full aspect-[9/10] object-cover"
          />
        </div>
        <div className="col-span-7 flex flex-col">
          <h2 className="text-2xl font-bold mb-1">
            <Balancer>{data?.title}</Balancer>
          </h2>
          <div className="flex items-center gap-3 mb-5">
            {data?.categories?.map(({ title }) => (
              <p key={title} className="text-sm text-muted-foreground">
                {title}
              </p>
            ))}
          </div>
          <h6 className=" text-lg mb-3 font-semibold">
            {formatToIDR(data?.price)}
          </h6>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            stock: {data?.stock}
          </div>
          <div className="flex flex-col gap-3 mb-4">
            <Button>
              Add to Cart{" "}
              <ShoppingCart className="size-4 ml-2" strokeWidth={1.5} />
            </Button>
            <Button className="capitalize" variant="outline">
              favourite <Heart className="size-4 ml-2" strokeWidth={1.5} />
            </Button>
          </div>
          <div className="prose">{parse(data?.description)}</div>
        </div>
      </div>
      {/* comments */}
      <div className="flex flex-col gap-5">
        <div>form comments</div>
        <div className="flex flex-col gap-3">
          {data?.comments?.map(({ message }) => (
            <div key={message}>{message}</div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default SingleProductPage
