"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Comment from "./comment"
import parse from "html-react-parser"
import { CommentProps } from "@/types"

const ProductInfo = ({
  comments,
  description,
  slug,
}: {
  comments: CommentProps[] | undefined
  description: string | undefined
  slug: string[]
}) => {
  return (
    <Accordion type="single" collapsible defaultValue="description">
      <AccordionItem value="description">
        <AccordionTrigger className="text-base capitalize">
          description
        </AccordionTrigger>
        <AccordionContent>
          <div className="prose">{parse(description ?? "")}</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="review">
        <AccordionTrigger className="text-base capitalize">
          review
        </AccordionTrigger>
        <AccordionContent>
          <Comment comments={comments} productId={slug[1]} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductInfo
