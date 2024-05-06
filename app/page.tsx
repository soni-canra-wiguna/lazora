import { useUserServer } from "@/hook/use-user"
import ListProducts from "@/components/products"
import MaxWidthWrapper from "@/components/max-width-wrapper"

export default async function Home() {
  const session = await useUserServer()
  return (
    <MaxWidthWrapper className="min-h-screen py-32">
      <ListProducts />
    </MaxWidthWrapper>
  )
}
