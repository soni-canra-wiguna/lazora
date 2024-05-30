"use client"

import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getBanners } from "@/services/get-banners"
import { format, parseISO } from "date-fns"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import getProducts from "@/services/get-products"
import { ProductPostProps } from "@/types"
import { formatToIDR } from "@/utils/format-to-idr"
import DeleteItemProduct from "./delete-item-product"

export const BodyProductDashboard = () => {
  const { data, isPending, isError } = getProducts()

  return (
    <>
      {isPending ? (
        <div className="text-primary">loading products</div>
      ) : isError ? (
        <div className="text-primary">error products</div>
      ) : (
        data?.map((product) => {
          return <TableRowProduct key={product.id} product={product} />
        })
      )}
    </>
  )
}

export const FooterProductDashboard = () => {
  const { data } = getProducts()
  const totalProduct = data?.length ?? 0

  return (
    <div className="text-xs text-muted-foreground">
      Showing <strong>1-{totalProduct}</strong> of{" "}
      <strong>{totalProduct}</strong> products
    </div>
  )
}

const TableRowProduct = ({ product }: { product: ProductPostProps }) => {
  const [isAction, setIsAction] = useState(false)

  const title =
    product.title.length > 55
      ? product.title.slice(0, 54) + "..."
      : product.title
  const date = parseISO(product.createdAt.toString())
  const formattedDate = format(date, "yyyy-MM-dd hh:mm a")
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={product.title}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.images[0].image ?? ""}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>
        <Badge variant="outline">Active</Badge>
      </TableCell>
      <TableCell>{formatToIDR(product.price)}</TableCell>
      <TableCell className="hidden md:table-cell">{formattedDate}</TableCell>
      <TableCell>
        <DropdownMenu open={isAction} onOpenChange={setIsAction}>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <EditItemProduct product={product} setIsAction={setIsAction} /> */}
            <DeleteItemProduct id={product.id} setIsAction={setIsAction} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
