import FilterSidebar from "@/components/products/filter-sidebar"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import ListProduct from "@/components/products/list-product"
import TotalProducts from "@/components/products/total-products"

export default function ProductsPage() {
  return (
    <MaxWidthWrapper className="mt-32 flex min-h-screen items-start gap-4">
      <FilterSidebar />
      <div className="flex h-full w-5/6 flex-col">
        <h2 className="mb-3 flex items-center text-xl font-semibold capitalize">
          products(
          <TotalProducts />)
        </h2>
        <ListProduct />
      </div>
    </MaxWidthWrapper>
  )
}
