import MaxWidthWrapper from "@/components/max-width-wrapper"
import Product from "../_components/product"

const SingleProductPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params
  return (
    <MaxWidthWrapper className="py-32 relative">
      <Product slug={slug} />
    </MaxWidthWrapper>
  )
}

export default SingleProductPage
