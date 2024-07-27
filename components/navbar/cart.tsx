import { Minus, Plus, ShoppingCart } from "lucide-react"
import CustomTooltip from "../custom-tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { removeCartItem, resetCart } from "@/redux/features/cart/cart-slice"
import { formatTitleProduct } from "@/utils/format-title-product"
import { toast } from "../ui/use-toast"
import { Card } from "../ui/card"
import Image from "next/image"
import Balancer from "react-wrap-balancer"
import { formatToIDR } from "@/utils/format-to-idr"
import { URIProduct } from "@/utils/url-product"

export default function Cart() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { cart: carts } = useSelector((state: RootState) => state.carts)
  const dispatch = useDispatch()

  const closeSheet = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger aria-label="cart button">
        <CartButton totalCartItems={carts.length} />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col justify-between gap-4 p-4"
      >
        <h3 className="text-xl font-semibold capitalize">
          Cart ({carts.length})
        </h3>
        <div className="sheet_scrollbar relative flex w-full flex-1 flex-col gap-4 overflow-y-auto pr-2">
          {carts.length > 0 ? (
            carts?.map((cart) => {
              const handleRemoveCartItem = () => {
                dispatch(removeCartItem(cart.id))
              }
              return (
                <CartCard
                  key={cart.id}
                  handleRemoveCartItems={handleRemoveCartItem}
                  closeSheet={closeSheet}
                  {...cart}
                />
              )
            })
          ) : (
            <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <ShoppingCart className="mb-3 size-20 stroke-[1.5] text-secondary-foreground/30" />
              <h5 className="mb-1 text-lg font-medium">
                cart nya masih kosong
              </h5>
              <p className="w-4/5 text-center text-sm text-muted-foreground">
                Yuk lihat-lihat product kami dan checkout kalo kamu suka
              </p>
            </div>
          )}
        </div>
        <div className="flex h-max w-full flex-col gap-3 pb-2">
          <Link href="/account/carts">
            <Button className="shimmer w-full">
              View All ({carts.length})
            </Button>
          </Link>
          <div className="flex w-full items-center justify-center">
            <Button
              disabled={carts.length <= 0}
              onClick={() => dispatch(resetCart())}
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

export const CartButton = ({ totalCartItems }: { totalCartItems: number }) => {
  return (
    <div className="relative h-max w-max cursor-pointer">
      <CustomTooltip title="cart" side="bottom">
        <ShoppingCart className="size-6" strokeWidth={1.5} />
      </CustomTooltip>
      {totalCartItems > 0 && (
        <span className="absolute -bottom-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full border-[2px] border-white bg-primary p-2 text-xs text-background">
          {totalCartItems}
        </span>
      )}
    </div>
  )
}

interface CartCardProps {
  id?: string
  title?: string
  image?: string
  price?: number
  qty?: number
  handleRemoveCartItems: () => void
  closeSheet: () => void
}

const CartCard = ({
  id,
  title,
  image,
  price,
  qty,
  handleRemoveCartItems,
  closeSheet,
}: CartCardProps) => {
  const [totalQty, setTotalQty] = useState(qty)
  const urlProduct = URIProduct({ title: title ?? "", id: id ?? "" })

  return (
    <Card className="flex h-max gap-3 p-2 transition-all hover:bg-secondary">
      <Link
        href={urlProduct}
        onClick={closeSheet}
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
          href={`/p/${formatTitleProduct(title ?? "")}/${id}`}
          onClick={closeSheet}
          className="text-sm font-medium"
        >
          <Balancer>{title?.slice(0, 30) + "..."}</Balancer>
        </Link>
        <p className="text-xs">{formatToIDR(price ?? 0)}</p>
        <div className="mt-2 flex items-center">
          <Button
            onClick={(prev) => setTotalQty(totalQty! - 1)}
            variant="outline"
            size="icon"
            className="size-6"
          >
            <Minus className="size-3" />
          </Button>
          <div className="mx-2.5">{totalQty}</div>
          <Button
            onClick={(prev) => setTotalQty(totalQty! + 1)}
            variant="outline"
            size="icon"
            className="size-6"
          >
            <Plus className="size-3" />
          </Button>
        </div>
        <Button
          variant="link"
          className="w-max p-0 text-xs text-red-500"
          onClick={handleRemoveCartItems}
        >
          Remove
        </Button>
      </div>
    </Card>
  )
}
