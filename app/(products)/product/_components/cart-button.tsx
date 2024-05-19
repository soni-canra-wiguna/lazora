"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ShoppingCart } from "lucide-react"

const CartButton = () => {
  const handleAddToCart = () => {
    toast({
      title: "masih dalam tahap pengembangan",
    })
  }
  return (
    <Button className="shimmer" onClick={handleAddToCart}>
      Add to Cart <ShoppingCart className="size-4 ml-2" strokeWidth={1.5} />
    </Button>
  )
}

export default CartButton
