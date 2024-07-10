import BannerHomepage from "@/components/home/banner"
import ListCategoryHomepage from "@/components/home/list-category-homepage"
import ListProductsHomepage from "@/components/home/list-product-homepage"

export default async function Home() {
  return (
    <div className="min-h-screen py-32">
      <BannerHomepage />
      <ListCategoryHomepage />
      <ListProductsHomepage />
    </div>
  )
}
