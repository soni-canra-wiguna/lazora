import BannerHomepage from "@/components/home/banner"
import ListCategoryHomepage from "@/components/home/list-category-homepage"
import ListProductsHomepage from "@/components/home/list-product-homepage"

export default async function Home() {
  return (
    <div className="min-h-screen pb-32 pt-36">
      <BannerHomepage />
      <ListCategoryHomepage />
      <ListProductsHomepage />
    </div>
  )
}
