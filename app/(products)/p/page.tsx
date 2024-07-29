import FilterSidebar, {
  SuspenseFilterSidebar,
} from "@/components/products/filter-sidebar"
import ListProducts, {
  SuspenseListproducts,
} from "@/components/products/list-product"
import { Suspense } from "react"
import MaxWidthWrapper from "@/components/layouts/max-width-wrapper"
import TotalProducts from "@/components/products/total-products"

export default function ProductsPage() {
  return (
    <MaxWidthWrapper className="mt-32 flex min-h-screen items-start gap-4">
      <Suspense fallback={<SuspenseFilterSidebar />}>
        <FilterSidebar />
      </Suspense>
      <div className="flex h-full w-5/6 flex-col">
        <h2 className="mb-3 flex items-center text-xl font-semibold capitalize">
          products(
          <TotalProducts />)
        </h2>
        <Suspense fallback={<SuspenseListproducts />}>
          <ListProducts />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  )
}
