"use client"

import { Button } from "@/components/ui/button"
import {
  FavouriteProps,
  toggleFavourite,
} from "@/redux/features/favourite/favourite-slice"
import { ProductPostProps } from "@/types"
import { Heart } from "lucide-react"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const FavouriteToggle = ({
  product,
}: {
  product: ProductPostProps | undefined
}) => {
  const { favourites } = useSelector((state: RootState) => state.favourites)
  const [isFavourite, setIsFavourite] = useState(false)
  const dispatch = useDispatch()

  const handleAddToFavourite = () => {
    dispatch(
      toggleFavourite({
        id: product?.id,
        title: product?.title,
        image: product?.images[0].image,
        price: product?.price,
        stock: product?.stock,
      }),
    )

    if (favourites.some((fav) => fav.id === product?.id)) {
      setIsFavourite(false)
      toast({
        title: "Product di hapus dari favourite.",
      })
    } else {
      setIsFavourite(true)
      toast({
        title: "Product tersimpan di Favourite!",
      })
    }
  }

  const items =
    typeof window !== "undefined"
      ? (JSON.parse(
          // @ts-ignore
          localStorage.getItem("favourites"),
        ) as FavouriteProps[])
      : null

  useEffect(() => {
    if (items) {
      // @ts-ignore
      const existingItemById = items?.some((fav) => fav?.id === product?.id)
      existingItemById ? setIsFavourite(true) : setIsFavourite(false)
    }
  }, [items, product?.id])

  return (
    <Button
      onClick={handleAddToFavourite}
      className="capitalize"
      variant="outline"
    >
      favourite
      <Heart
        className={`ml-2 size-4 ${isFavourite && "fill-red-500 stroke-none"}`}
        strokeWidth={1.5}
      />
    </Button>
  )
}

export default FavouriteToggle
