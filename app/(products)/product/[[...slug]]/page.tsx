import MaxWidthWrapper from "@/components/max-width-wrapper"
import Product from "../_components/product"
import { ProductPostProps } from "@/types"
import { Metadata } from "next"
import axios from "axios"

interface GenerateMetadataProps {
  params: { slug: string[] }
  searchParams: {
    indexImg: string
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = params
  const productId = slug[1]
  const indexImage = +searchParams.indexImg // + is shorthand Number()

  try {
    const { data } = await axios.get(
      "https://lazora.vercel.app/api/products/" + productId
    )
    const product: ProductPostProps = data.product

    return {
      title: product.title,
      description: `Beli ${product.title} hanya di Lazora`,
      openGraph: {
        title: product.title,
        images: product.images[indexImage || 0].image,
        description: `Beli ${product.title} hanya di Lazora`,
        url: `${process.env.PROD_URL}/product/${slug[0]}/${slug[1]}`,
        siteName: "Lazora",
        type: "website",
      },
    }
  } catch (error) {
    console.log(error)
    throw new Error("error generating metadata")
  }
}

const SingleProductPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params
  return (
    <MaxWidthWrapper className="py-32 relative">
      <Product slug={slug} />
    </MaxWidthWrapper>
  )
}

export default SingleProductPage
