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
import { Banner } from "@prisma/client"
import { format, parseISO } from "date-fns"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import EditItemBanner from "../../_components/edit-item-banner"
import DeleteItemBanner from "../../_components/delete-item-banner"

export const BodyBannerDashboard = () => {
  const { data, isPending, isError } = getBanners()

  return (
    <>
      {isPending ? (
        <div className="text-primary">loading banner</div>
      ) : isError ? (
        <div className="text-primary">error banner</div>
      ) : (
        data?.map((banner) => {
          return <TableRowBanner key={banner.id} banner={banner} />
        })
      )}
    </>
  )
}

export const FooterBannerDashboard = () => {
  const { data } = getBanners()
  const totalProduct = data?.length ?? 0

  return (
    <div className="text-xs text-muted-foreground">
      Showing <strong>1-{totalProduct}</strong> of{" "}
      <strong>{totalProduct}</strong> banners
    </div>
  )
}

const TableRowBanner = ({ banner }: { banner: Banner }) => {
  const [isAction, setIsAction] = useState(false)

  const date = parseISO(banner.createdAt.toString())
  const formattedDate = format(date, "yyyy-MM-dd hh:mm a")
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={banner.title}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={banner.image}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{banner.title}</TableCell>
      <TableCell>
        <Badge variant="outline">Active</Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span
            style={{
              backgroundColor: banner.background_color,
            }}
            className="size-8 border rounded-full mr-2"
          />
          {banner.background_color}
        </div>
      </TableCell>
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
            <EditItemBanner banner={banner} setIsAction={setIsAction} />
            <DeleteItemBanner id={banner.id} setIsAction={setIsAction} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
