"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { addToCart } from "@/redux/features/cart/cart-slice"
import { ProductPostProps } from "@/types"
import { ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { ToastAction } from "../ui/toast"
import { useRouter } from "next/navigation"
import { useUserClient } from "@/hook/use-user"

const CartButton = ({ data }: { data: ProductPostProps | undefined }) => {
  const dispatch = useDispatch()
  const { status } = useUserClient()
  const router = useRouter()

  const handleAddToCart = () => {
    if (status === "unauthenticated") {
      toast({
        title: "unauthenticated",
        description: "Sign In terlebih dahulu",
        action: (
          <ToastAction
            onClick={() => router.push("/sign-in")}
            altText="Sign In"
          >
            Sign In
          </ToastAction>
        ),
      })
    } else {
      // const product = {
      //   id: data?.id,
      //   title: data?.title,
      //   image: data?.images[0].image,
      //   price: data?.price,
      //   stock: data?.stock,
      //   qty: 1,
      // }
      // dispatch(addToCart(product))

      // toast({
      //   title: "product ditambahkan ke cart",
      // })
      toast({
        title: "building process...",
      })
    }
  }
  return (
    <Button className="shimmer" onClick={handleAddToCart}>
      Add to Cart <ShoppingCart className="ml-2 size-4" strokeWidth={1.5} />
    </Button>
  )
}

export default CartButton
