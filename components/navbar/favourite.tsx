import { Heart } from "lucide-react"
import CustomTooltip from "../custom-tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Card } from "../ui/card"
import { formatToIDR } from "@/utils/format-to-idr"
import {
  FavouriteProps,
  removeFavourite,
} from "@/redux/features/favourite/favourite-slice"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const Favourite = () => {
  const { favourites } = useSelector((state: RootState) => state.favourites)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useDispatch()

  const closeSheetModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <FavouriteButton totalFavourites={favourites.length} />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-4 p-4">
        <h3 className="font-semibold text-xl capitalize">
          favourites({favourites.length})
        </h3>
        <div className="grid grid-cols-1 gap-4 w-full overflow-y-auto">
          {favourites?.map(({ id, image, title, price, stock }) => {
            const handleRemoveFavourite = () => {
              dispatch(removeFavourite(id))
            }
            return (
              <Card key={id} className="flex flex-col gap-2 p-2">
                <h4 className="font-medium text-base">{title}</h4>
                <p className="text-xs">{formatToIDR(price ?? 0)}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRemoveFavourite}
                >
                  remove
                </Button>
              </Card>
            )
          })}
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
