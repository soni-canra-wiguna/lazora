import { useUserServer } from "@/hook/use-user"
import ListProducts from "@/components/products"
import BannerHomepage from "@/components/banner"
import PreviewKeyboards from "@/components/preview-keyboard"

export default async function Home() {
  const session = await useUserServer()
  return (
    <div className="min-h-screen py-32">
      <BannerHomepage />
      <ListProducts />
      {/* <PreviewKeyboards /> */}
    </div>
  )
}
