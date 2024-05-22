import MaxWidthWrapper from "@/components/max-width-wrapper"
import Link from "next/link"

const DashboardPage = () => {
  return (
    <MaxWidthWrapper className="m-32">
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/products/create">create product</Link>
        <Link href="/dashboard/banner/create">create banner</Link>
      </div>
    </MaxWidthWrapper>
  )
}

export default DashboardPage
