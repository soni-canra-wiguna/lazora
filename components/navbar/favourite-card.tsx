import Link from "next/link"
import { Card } from "../ui/card"
import { formatTitleProduct } from "@/utils/format-title-product"
import Image from "next/image"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

interface FavouriteCardProps {
  id?: string | undefined
  title?: string | undefined
  image?: string | undefined
  price?: number | undefined
  handleRemoveFavourite: () => void
}

const FavouriteCard = ({
  id,
  title,
  image,
  price,
  handleRemoveFavourite,
}: FavouriteCardProps) => {
  return (
    <Card
      key={id}
      className="flex gap-3 p-2 h-max hover:bg-secondary transition-all"
    >
      <Link
        href={`/product/${formatTitleProduct(title ?? "")}/${id}`}
        className="size-16 shimmer border"
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
          className="font-medium text-sm"
        >
          <Balancer>{title?.slice(0, 30) + "..."}</Balancer>
        </Link>
        <p className="text-xs">{formatToIDR(price ?? 0)}</p>
        <div className="flex items-center gap-2.5">
          <Button
            variant="link"
            className="p-0 text-red-500 text-xs"
            onClick={handleRemoveFavourite}
          >
            Remove
          </Button>
          <Button
            variant="link"
            className="p-0 hover text-xs"
            onClick={() =>
              toast({
                title: "building process...",
              })
            }
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default FavouriteCard
