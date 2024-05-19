"use client"

import { formatToIDR } from "@/utils/format-to-idr"
import { getSingleProduct } from "@/utils/get-products"
import { Loader2 } from "lucide-react"
import Balancer from "react-wrap-balancer"
import ImageProduct from "./image-product"
import { Badge } from "@/components/ui/badge"
import LoadingProduct from "./loading-product"
import FavouriteToggle from "./favourite-toggle"
import CartButton from "./cart-button"
import ProductInfo from "./product-info"

const Product = ({ slug }: { slug: string[] }) => {
  const { data, isPending, isError } = getSingleProduct(slug[1])

  return (
    <>
      {isPending ? (
        <LoadingProduct />
      ) : isError ? (
        <div className="flex flex-col gap-2 w-full">
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          <p>error nih, coba refresh deh</p>
        </div>
      ) : (
        <div className="flex gap-12 items-start">
          <ImageProduct images={data?.images ?? []} title={data?.title ?? ""} />
          <div className="w-[500px] flex flex-col">
            {/*  */}
            <div className="flex items-center gap-3 mb-2.5">
              {data?.categories?.map(({ title: category }) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="font-medium bg-secondary hover:bg-secondary"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-3.5">
              <Balancer>{data?.title}</Balancer>
            </h2>
            {/* <h2 className="text-2xl font-bold mb-2.5">
            <Balancer>{data?.title}</Balancer>
          </h2>
          <div className="flex items-center gap-3 mb-5">
            {data?.categories?.map(({ title }) => (
              <Badge key={title} variant="secondary" className='font-medium'>
                {title}
              </Badge>
            ))}
          </div> */}
            {/*  */}
            <h6 className=" text-lg mb-3 font-semibold">
              {formatToIDR(data?.price ?? 0)}
            </h6>
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              stock: {data?.stock}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FavouriteToggle data={data} />
              <CartButton />
            </div>
            <ProductInfo
              comments={data?.comments}
              description={data?.description}
              slug={slug}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Product
