import MaxWidthWrapper from "@/components/max-width-wrapper"
import Product from "../_components/product"
import { ProductPostProps } from "@/types"
import { Metadata } from "next"
import axios from "axios"
import ImageProduct from "../_components/image-product"
import { Badge } from "@/components/ui/badge"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import FavouriteToggle from "../_components/favourite-toggle"
import CartButton from "../_components/cart-button"
import ProductInfo from "../_components/product-info"

interface GenerateMetadataProps {
  params: { slug: string[] }
  searchParams: {
    indexImg: string
  }
}

const getProduct = async (slug: string[]) => {
  try {
    const productId = slug[1]
    const response = await fetch(
      `https://lazora.vercel.app/api/products/${productId}`,
      {
        next: {
          tags: ["singleProduct"],
        },
      }
    )
    const { product }: { product: ProductPostProps } = await response.json()
    return {
      product,
      slugProduct: slug,
    }
  } catch (error) {
    throw new Error("something went wrong")
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

// ketika ingin load page ini sedikit lambat karena fetch 2 kali yaitu di server(untuk metadata) dan di client(untuk product)
//sebenarnya, yang bikin lambat/lemot itu saat fetch di server(metadata), tapi karena itu untuk SEO dan itu penting, but ya ok lah.
const SingleProductPage = async ({ params }: GenerateMetadataProps) => {
  const { slug } = params
  const { product } = await getProduct(slug)
  return (
    <MaxWidthWrapper className="py-32 relative">
      <div className="flex gap-12 items-start">
        <ImageProduct
          images={product.images ?? []}
          title={product.title ?? ""}
        />
        <div className="w-[500px] flex flex-col">
          {/*  */}
          <div className="flex items-center gap-3 mb-2.5">
            {product.categories?.map(({ title: category }) => (
              <Badge
                key={category}
                variant="secondary"
                className="font-medium bg-secondary hover:bg-secondary"
              >
                {category}
              </Badge>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-3.5">
            <Balancer>{product.title}</Balancer>
          </h2>
          <h6 className=" text-lg mb-3 font-semibold">
            {formatToIDR(product.price ?? 0)}
          </h6>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            stock: {product.stock}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <FavouriteToggle data={product} />
            <CartButton data={product} />
          </div>
          <ProductInfo
            comments={product.comments}
            description={product.description}
            slug={slug}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default SingleProductPage
