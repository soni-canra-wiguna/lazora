import Link from "next/link"
import DynamicButton from "../buttons/dynamic-button"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export const CartAndFavouriteLink = () => {
  const { favourites } = useSelector((state: RootState) => state.favourites)
  const { cart } = useSelector((state: RootState) => state.carts)
  return (
    <div className="flex items-center gap-6">
      <Link href="/account/favourite">
        <DynamicButton type="favourite" totalItems={favourites.length} />
      </Link>
      <Link href="/account/cart">
        <DynamicButton type="cart" totalItems={cart.length} />
      </Link>
    </div>
  )
}
