"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { addToCart } from '@/redux/features/cart/cart-slice'
import { ProductPostProps } from '@/types'
import { cp } from 'fs'
import { ShoppingCart } from "lucide-react"
import { useDispatch } from 'react-redux'

const CartButton = ({ data }: { data: ProductPostProps | undefined }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    const item = {
      id: data?.id,
        title: data?.title,
        image: data?.images[0].image,
        price: data?.price,
        stock: data?.stock,
        qty: 1
    }
    dispatch(addToCart(item))
    console.log(item)

    toast({
      title: "product ditambahkan ke cart",
    })
  }
  return (
    <Button className="shimmer" onClick={handleAddToCart}>
      Add to Cart <ShoppingCart className="size-4 ml-2" strokeWidth={1.5} />
    </Button>
  )
}

export default CartButton
