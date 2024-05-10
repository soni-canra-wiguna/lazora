"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { formatToIDR } from "@/utils/format-to-idr"
import { getSingleProduct } from "@/utils/get-products"
import { Heart, Loader2, ShoppingCart } from "lucide-react"
import Balancer from "react-wrap-balancer"
import parse from "html-react-parser"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Comment from "../_components/comment"
import ImageProduct from "../_components/image-product"
import { Badge } from "@/components/ui/badge"
import { useDispatch } from "react-redux"
import {
  addToFavourite,
  toggleFavourite,
} from "@/redux/features/favourite/favourite-slice"
import { useState } from "react"

const SingleProductPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params
  const { data, isPending, isError } = getSingleProduct(slug[1])
  const dispatch = useDispatch()
  const [isFavourite, setIsFavourite] = useState(false)

  const handleAddToFavourite = () => {
    dispatch(
      toggleFavourite({
        id: data?.id,
        title: data?.title,
        image: data?.images[0].image,
        price: data?.price,
        stock: data?.stock,
      })
    )
    setIsFavourite(!isFavourite)
  }

  if (isPending) return <p className="pt-32">loading...</p>
  if (isError) return <p className="pt-32">error</p>

  return (
    <MaxWidthWrapper className="py-32 relative">
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
              {data?.categories?.map(({ title }) => (
                <Badge
                  key={title}
                  variant="secondary"
                  className="font-medium bg-secondary hover:bg-secondary"
                >
                  {title}
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
              <Button
                onClick={handleAddToFavourite}
                className="capitalize"
                variant="outline"
              >
                favourite{" "}
                <Heart
                  className={`size-4 ml-2 ${
                    isFavourite && "fill-red-500 stroke-none"
                  }`}
                  strokeWidth={1.5}
                />
              </Button>
              <Button className="shimmer">
                Add to Cart{" "}
                <ShoppingCart className="size-4 ml-2" strokeWidth={1.5} />
              </Button>
            </div>
            {/* accordion start */}
            <Accordion type="single" collapsible defaultValue="description">
              <AccordionItem value="description">
                <AccordionTrigger className="text-base capitalize">
                  description
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose">{parse(data?.description ?? "")}</div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="review">
                <AccordionTrigger className="text-base capitalize">
                  review
                </AccordionTrigger>
                <AccordionContent>
                  <Comment comments={data?.comments} productId={slug[1]} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* accordion end */}
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  )
}

export default SingleProductPage

const LoadingProduct = () => {
  return <div className="text-center w-full font-semibold">loading...</div>
}
