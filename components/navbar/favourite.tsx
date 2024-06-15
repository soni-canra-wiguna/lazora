import { Heart, HeartOff } from "lucide-react"
import CustomTooltip from "../custom-tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import {
  removeFavourite,
  resetFavourite,
} from "@/redux/features/favourite/favourite-slice"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import Link from "next/link"
import { Card } from "../ui/card"
import { formatTitleProduct } from "@/utils/format-title-product"
import Image from "next/image"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { toast } from "../ui/use-toast"
import { addToCart } from "@/redux/features/cart/cart-slice"

const Favourite = () => {
  const { favourites } = useSelector((state: RootState) => state.favourites)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useDispatch()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <FavouriteButton totalFavourites={favourites.length} />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col justify-between gap-4 p-4"
      >
        <h3 className="text-xl font-semibold capitalize">
          favourites ({favourites.length})
        </h3>
        <div className="sheet_scrollbar relative flex w-full flex-1 flex-col gap-4 overflow-y-auto pr-2">
          {favourites.length > 0 ? (
            favourites?.map((favourite) => {
              const handleRemoveFavourite = () => {
                dispatch(removeFavourite(favourite.id))
                toast({
                  title: "product di hapus dari favourite",
                })
              }

              const handleAddToCart = () => {
                dispatch(
                  addToCart({
                    id: favourite.id,
                    title: favourite.title,
                    image: favourite.image,
                    price: favourite.price,
                    stock: favourite.stock,
                    qty: 1,
                  }),
                )
                toast({
                  title: "product ditambahkan ke cart",
                })
              }
              return (
                <FavouriteCard
                  handleAddToCart={handleAddToCart}
                  key={favourite.id}
                  handleRemoveFavourite={handleRemoveFavourite}
                  {...favourite}
                />
              )
            })
          ) : (
            <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <HeartOff className="mb-3 size-20 stroke-[1.5] text-secondary-foreground/30" />
              <h5 className="mb-1 text-lg font-medium">Belum ada items</h5>
              <p className="w-4/5 text-center text-sm text-muted-foreground">
                Tandai product yang kamu suka dengan click tombol hati
              </p>
            </div>
          )}
        </div>
        <div className="flex h-max w-full flex-col gap-3 pb-2">
          <Link href="/account/favourites">
            <Button className="w-full">View All ({favourites.length})</Button>
          </Link>
          <div className="flex w-full items-center justify-center">
            <Button
              disabled={favourites.length <= 0}
              onClick={() => dispatch(resetFavourite())}
              variant="link"
              className="size-max py-0 text-xs capitalize text-muted-foreground hover:text-red-500"
            >
              Remove All
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Favourite

export const FavouriteButton = ({
  totalFavourites,
}: {
  totalFavourites: number
}) => {
  return (
    <div className="relative h-max w-max cursor-pointer">
      <CustomTooltip title="favourite" side="bottom">
        <Heart className="size-6" strokeWidth={1.5} />
      </CustomTooltip>
      {totalFavourites > 0 && (
        <span className="absolute -bottom-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full border-[2px] border-white bg-primary p-2 text-xs text-background">
          {totalFavourites}
        </span>
      )}
    </div>
  )
}

interface FavouriteCardProps {
  id?: string | undefined
  title?: string | undefined
  image?: string | undefined
  price?: number | undefined
  handleRemoveFavourite: () => void
  handleAddToCart: () => void
}

const FavouriteCard = ({
  id,
  title,
  image,
  price,
  handleRemoveFavourite,
  handleAddToCart,
}: FavouriteCardProps) => {
  return (
    <Card className="flex h-max gap-3 p-2 transition-all hover:bg-secondary">
      <Link
        href={`/product/${formatTitleProduct(title ?? "")}/${id}`}
        className="shimmer size-16 border"
      >
        <Image
          src={image ?? ""}
          alt={title ?? ""}
          width={150}
          height={150}
          className="size-full object-scale-down object-center"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <Link
          href={`/product/${formatTitleProduct(title ?? "")}/${id}`}
          className="text-sm font-medium"
        >
          <Balancer>{title?.slice(0, 30) + "..."}</Balancer>
        </Link>
        <p className="text-xs">{formatToIDR(price ?? 0)}</p>
        <div className="flex items-center gap-2.5">
          <Button
            variant="link"
            className="p-0 text-xs text-red-500"
            onClick={handleRemoveFavourite}
          >
            Remove
          </Button>
          <Button
            variant="link"
            className="hover p-0 text-xs"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  )
}
