import { ShoppingCart } from "lucide-react"

const Cart = ({ cartItems }: { cartItems: number }) => {
  return (
    <div className="relative w-max h-max">
      <ShoppingCart className="size-6" strokeWidth={1.5} />
      {cartItems > 0 && (
        <span className="absolute -right-1.5 -bottom-1 bg-primary text-background w-4 h-4 p-2 rounded-full border-[2px] border-white text-xs flex items-center justify-center">
          {cartItems}
        </span>
      )}
    </div>
  )
}

export default Cart
