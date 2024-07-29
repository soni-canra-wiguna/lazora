import { Heart, ShoppingCart } from "lucide-react"
import CustomTooltip from "../custom-tooltip"

interface DynamicButtonProps {
  type: "cart" | "favourite"
  totalItems: number
}

export default function DynamicButton({
  type,
  totalItems,
}: DynamicButtonProps) {
  if (type === "cart") {
    return (
      <div className="relative h-max w-max cursor-pointer">
        <CustomTooltip title="cart" side="bottom">
          <ShoppingCart className="size-6" strokeWidth={1.5} />
        </CustomTooltip>
        {totalItems > 0 && (
          <span className="absolute -bottom-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full border-[2px] border-white bg-primary p-2 text-xs text-background">
            {totalItems}
          </span>
        )}
      </div>
    )
  }

  if (type === "favourite") {
    return (
      <div className="relative h-max w-max cursor-pointer">
        <CustomTooltip title="favourite" side="bottom">
          <Heart className="size-6" strokeWidth={1.5} />
        </CustomTooltip>
        {totalItems > 0 && (
          <span className="absolute -bottom-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full border-[2px] border-white bg-primary p-2 text-xs text-background">
            {totalItems}
          </span>
        )}
      </div>
    )
  }
}
