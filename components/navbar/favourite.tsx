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
import FavouriteCard from "./favourite-card"

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
        className="flex flex-col gap-4 p-4 justify-between"
      >
        <h3 className="font-semibold text-xl capitalize">
          favourites ({favourites.length})
        </h3>
        <div className="flex flex-col gap-4 w-full overflow-y-auto relative flex-1 sheet_scrollbar pr-2">
          {favourites.length > 0 ? (
            favourites?.map((favourite) => {
              const handleRemoveFavourite = () => {
                dispatch(removeFavourite(favourite.id))
              }
              return (
                <FavouriteCard
                  key={favourite.id}
                  handleRemoveFavourite={handleRemoveFavourite}
                  {...favourite}
                />
              )
            })
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full">
              <HeartOff className="stroke-[1.5] text-secondary-foreground/30 size-20 mb-3" />
              <h5 className="font-medium text-lg mb-1">Belum ada items</h5>
              <p className="text-sm text-center w-4/5 text-muted-foreground">
                Tandai product yang kamu suka dengan click tombol hati
              </p>
            </div>
          )}
        </div>
        <div className="w-full h-max flex flex-col gap-3 pb-2">
          <Link href="/account/favourites">
            <Button className="w-full">View All ({favourites.length})</Button>
          </Link>
          <div className="flex items-center justify-center w-full">
            <Button
              disabled={favourites.length <= 0}
              onClick={() => dispatch(resetFavourite())}
              variant="link"
              className="text-muted-foreground hover:text-red-500 text-xs capitalize py-0 size-max"
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
    <div className="relative w-max h-max cursor-pointer">
      <CustomTooltip title="favourite" side="bottom">
        <Heart className="size-6" strokeWidth={1.5} />
      </CustomTooltip>
      {totalFavourites > 0 && (
        <span className="absolute -right-1.5 -bottom-1 bg-primary text-background w-4 h-4 p-2 rounded-full border-[2px] border-white text-xs flex items-center justify-center">
          {totalFavourites}
        </span>
      )}
    </div>
  )
}
