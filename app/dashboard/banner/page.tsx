"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MoreHorizontal, Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getBanners } from "@/services/get-banners"
import { parseISO, format } from "date-fns"
import { useState } from "react"
import { Banner } from "@prisma/client"
import Link from "next/link"
import EditItemBanner from "../_components/edit-item-banner"
import DeleteItemBanner from "../_components/delete-item-banner"

const BannerPage = () => {
  const { data, isPending, isError } = getBanners()

  if (!data) return

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-end">
        <Link href="/dashboard/banner/create">
          <Button className="capitalize">
            create banner <Plus className="ml-2 size-4" />
          </Button>
        </Link>
      </div>
      <div>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Banners</CardTitle>
            <CardDescription>Manage your banner products</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Background Color</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending ? (
                  <div className="text-primary">loading banner</div>
                ) : isError ? (
                  <div className="text-primary">error banner</div>
                ) : (
                  data?.map((banner) => {
                    return <TableRowBanner key={banner.id} banner={banner} />
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{data.length}</strong> of{" "}
              <strong>{data.length}</strong> banners
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default BannerPage

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
