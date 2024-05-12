import { useUserServer } from "@/hook/use-user"
import ListProducts from "@/components/products"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import BannerHomepage from "@/components/banner"

export default async function Home() {
  const session = await useUserServer()
  return (
    <MaxWidthWrapper className="min-h-screen py-32">
      <BannerHomepage />
      <ListProducts />
    </MaxWidthWrapper>
  )
}
