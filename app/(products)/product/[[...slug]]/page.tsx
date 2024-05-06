// @ts-nocheck
"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { formatToIDR } from "@/utils/format-to-idr"
import { getSingleProduct } from "@/utils/get-products"
import { Heart, ShoppingCart } from "lucide-react"
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
// import { useSearchParams } from 'next/navigation'

const SingleProductPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params
  // const params = useSearchParams()
  // const productId: string | null = params.get("productId" || null)
  const { data, isPending, isError } = getSingleProduct(slug[1])

  console.log(data)

  if (isPending) return <p className="pt-32">loading...</p>
  if (isError) return <p className="pt-32">error</p>

  return (
    <MaxWidthWrapper className="py-32 relative">
      <div className="flex gap-12 items-start">
        <ImageProduct images={data?.images} title={data?.title} />
        <div className="w-[500px] flex flex-col">
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
          <div className="flex items-center gap-4 mb-4">
            <Button className="capitalize" variant="outline">
              favourite <Heart className="size-4 ml-2" strokeWidth={1.5} />
            </Button>
            <Button>
              Add to Cart{" "}
              <ShoppingCart className="size-4 ml-2" strokeWidth={1.5} />
            </Button>
            {/* <Button className="capitalize" variant="link" asChild>
              <Link href={`/dashboard/${slug[1]}/edit`}>edit product</Link>
            </Button> */}
          </div>
          {/* accordion start */}
          <Accordion type="single" collapsible defaultValue="description">
            <AccordionItem value="description">
              <AccordionTrigger className="text-base capitalize">
                description
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose">{parse(data?.description)}</div>
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
    </MaxWidthWrapper>
  )
}

export default SingleProductPage
