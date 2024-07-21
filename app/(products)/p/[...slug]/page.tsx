import MaxWidthWrapper from "@/components/max-width-wrapper"
import { ProductPostProps } from "@/types"
import { Metadata } from "next"
import ImageProduct from "@/components/detail-product/image-product"
import { Badge } from "@/components/ui/badge"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import FavouriteToggle from "@/components/detail-product/favourite-toggle"
import CartButton from "@/components/detail-product/cart-button"
import ProductInfo from "@/components/detail-product/product-info"
import Recommendation from "@/components/detail-product/recommendation"
import { notFound, redirect } from "next/navigation"

interface GenerateMetadataProps {
  params: { slug: string[] }
  searchParams: {
    indexImg: string
  }
}

const URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_URL
    : process.env.PROD_URL

const getProduct = async (slug: string[]) => {
  try {
    const productId = slug[1]
    const response = await fetch(`${URL}/api/products/${productId}`, {
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
  const indexImage = +searchParams.indexImg // + is shorthand Number()

  return {
    title: product.title,
    description: `Beli ${product.title} hanya di Lazora`,
    openGraph: {
      title: product.title,
      images: product.images[indexImage || 0].image,
      description: `Beli ${product.title} hanya di Lazora`,
      url: `https://lazora.vercel.app/product/${slug[0]}/${slug[1]}`,
      siteName: "Lazora",
      type: "website",
    },
  }
}

const SingleProductPage = async ({ params }: GenerateMetadataProps) => {
  const { slug } = params
  const { product } = await getProduct(slug)

  if (!product) {
    console.log("product not found")
    notFound()
  }

  return (
    <MaxWidthWrapper className="relative min-h-screen pt-32">
      <div className="mb-[100px] flex items-start gap-12">
        <ImageProduct
          images={product.images ?? []}
          title={product.title ?? ""}
          price={product.price ?? 0}
        />
        <div className="flex w-[500px] flex-col">
          {/*  */}
          <div className="mb-2.5 flex items-center gap-3">
            {product.categories?.map(({ title: category }) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-secondary font-medium hover:bg-secondary"
              >
                {category}
              </Badge>
            ))}
          </div>
          <h2 className="mb-3.5 text-2xl font-bold">
            <Balancer>{product.title}</Balancer>
          </h2>
          <h6 className="mb-3 text-lg font-semibold">
            {formatToIDR(product.price ?? 0)}
          </h6>
          <div className="mb-3 flex items-center text-sm text-muted-foreground">
            stock: {product.stock}
          </div>
          <div className="mb-4 flex items-center gap-4">
            <FavouriteToggle product={product} />
            <CartButton product={product} />
          </div>
          <ProductInfo
            comments={product.comments}
            description={product.description}
            slug={slug}
          />
        </div>
      </div>
      <Recommendation category={product.categories[0].title} id={product.id} />
    </MaxWidthWrapper>
  )
}

export default SingleProductPage
