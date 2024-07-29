import { Suspense } from "react"
import Balancer from "react-wrap-balancer"
import { ProductPostProps } from "@/types"
import { Badge } from "@/components/ui/badge"
import { formatToIDR } from "@/utils/format-to-idr"
import MaxWidthWrapper from "@/components/layouts/max-width-wrapper"
import ImageProduct, { SuspenseImageProduct } from "./image-product"
import FavouriteToggle from "./favourite-toggle"
import CartButton from "./cart-button"
import ProductInfo from "./product-info"
import Recommendation from "./recommendation"
import Link from "next/link"
import { formatTitleProduct } from "@/utils/format-title-product"

interface DetailProductProps {
  product: ProductPostProps
  slug: string[]
}

export default function DetailProduct({ product, slug }: DetailProductProps) {
  return (
    <MaxWidthWrapper className="relative min-h-screen pt-32">
      <div className="mb-[100px] flex items-start gap-12">
        <Suspense fallback={<SuspenseImageProduct />}>
          <ImageProduct
            images={product.images ?? []}
            title={product.title ?? ""}
            price={product.price ?? 0}
          />
        </Suspense>
        <div className="flex w-[500px] flex-col">
          {/*  */}
          <div className="mb-2.5 flex items-center gap-3">
            {product.categories?.map(({ title: category }) => (
              <Link href={`/c/${formatTitleProduct(category)}`} key={category}>
                <Badge
                  variant="secondary"
                  className="bg-secondary hover:bg-secondary-foreground/10"
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
          <h2 className="mb-3.5 text-2xl font-bold">
            <Balancer>{product.title}</Balancer>
          </h2>
          <h3 className="mb-3 text-lg font-semibold">
            {formatToIDR(product.price ?? 0)}
          </h3>
          <p className="mb-3 flex items-center text-sm text-muted-foreground">
            stock: {product.stock}
          </p>
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
