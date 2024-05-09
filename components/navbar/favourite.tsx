import { Heart } from "lucide-react"
import CustomTooltip from "../custom-tooltip"

const Favourite = ({ favourites }: { favourites: number }) => {
  return (
    <div className="relative w-max h-max">
      <CustomTooltip title="favourite" side="bottom">
        <Heart className="size-6" strokeWidth={1.5} />
      </CustomTooltip>
      {favourites > 0 && (
        <span className="absolute -right-1.5 -bottom-1 bg-primary text-background w-4 h-4 p-2 rounded-full border-[2px] border-white text-xs flex items-center justify-center">
          {favourites}
        </span>
      )}
    </div>
  )
}

export default Favourite
