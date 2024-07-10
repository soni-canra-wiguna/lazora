import MaxWidthWrapper from "@/components/max-width-wrapper"
import LoadingProduct from "@/components/detail-product/loading-product"

export default function Loading() {
  return (
    <MaxWidthWrapper className="pt-32">
      <LoadingProduct />
    </MaxWidthWrapper>
  )
}
