import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import {
  BodyBannerDashboard,
  FooterBannerDashboard,
} from "@/components/dashboard/banners/banner-dashboard"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const BannerPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-end">
        <Link href="/dashboard/banners/create">
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
                <BodyBannerDashboard />
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <FooterBannerDashboard />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default BannerPage
