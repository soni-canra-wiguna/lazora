import { Button } from "@/components/ui/button"
import {
  FavouriteProps,
  toggleFavourite,
} from "@/redux/features/favourite/favourite-slice"
import { ProductPostProps } from "@/types"
import { Heart } from "lucide-react"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

const ToggleFavourite = ({ data }: { data: ProductPostProps | undefined }) => {
  const [isFavourite, setIsFavourite] = useState(false)
  const dispatch = useDispatch()

  const handleAddToFavourite = () => {
    dispatch(
      toggleFavourite({
        id: data?.id,
        title: data?.title,
        image: data?.images[0].image,
        price: data?.price,
        stock: data?.stock,
      })
    )
    setIsFavourite(!isFavourite)
  }

  const items =
    typeof window !== "undefined"
      ? (JSON.parse(
          // @ts-ignore
          localStorage.getItem("favourites")
        ) as FavouriteProps[])
      : null

  useEffect(() => {
    // @ts-ignore
    const existingItemById = items.some((f) => f.id === data?.id)
    // existingItemById ? setIsFavourite(true) : setIsFavourite(false)
    if (existingItemById) {
      setIsFavourite(true)
    } else {
      setIsFavourite(false)
    }
  }, [items])

  return (
    <Button
      onClick={handleAddToFavourite}
      className="capitalize"
      variant="outline"
    >
      favourite{" "}
      <Heart
        className={`size-4 ml-2 ${isFavourite && "fill-red-500 stroke-none"}`}
        strokeWidth={1.5}
      />
    </Button>
  )
}

export default ToggleFavourite
