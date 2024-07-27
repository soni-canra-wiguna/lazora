import DetailProduct from "@/components/detail-product"
import { WEBSITE_URL } from "@/constants"
import { ProductPostProps } from "@/types"
import { formatTitleProduct } from "@/utils/format-title-product"
import { Metadata } from "next"
import { notFound } from "next/navigation"
interface GenerateMetadataProps {
  params: { slug: string[] }
  searchParams: {
    indexImage: number
  }
}

const getProduct = async (slug: string[]) => {
  try {
    const productId = slug[1]
    const response = await fetch(`${WEBSITE_URL}/api/products/${productId}`, {
      next: {
        tags: ["singleProduct"],
      },
    })
    const { data }: { data: ProductPostProps } = await response.json()
    return {
      product: data,
      slugProduct: slug,
    }
  } catch (error) {
    console.log("[error product]", error)
    throw new Error(`[SINGLE_PRODUCT] => ${error}`)
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = params
  const { product } = await getProduct(slug)
  const indexImage = +searchParams.indexImage // + is shorthand Number()
  const URIProduct = `${WEBSITE_URL}/p/${formatTitleProduct(slug[0])}/${slug[1]}?indexImage=0`

  return {
    title: product.title,
    description: `Beli ${product.title} hanya di Lazora`,
    openGraph: {
      title: product.title,
      images: product.images[indexImage || 0].image,
      description: `Beli ${product.title} hanya di Lazora`,
      url: URIProduct,
      siteName: "Lazora",
      type: "website",
    },
    alternates: {
      canonical: URIProduct,
    },
  }
}

export default async function SingleProductPage({
  params,
}: GenerateMetadataProps) {
  const { slug } = params
  const { product } = await getProduct(slug)

  if (!product) {
    console.log("product not found")
    notFound()
  }

  return <DetailProduct product={product} slug={slug} />
}
