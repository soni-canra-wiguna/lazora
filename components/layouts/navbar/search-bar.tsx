import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowUpFromDot, Loader2, SearchIcon, X } from "lucide-react"
import MaxWidthWrapper from "@/components/layouts/max-width-wrapper"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { useDebounce } from "use-debounce"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductPostProps } from "@/types"
import Link from "next/link"
import DynamicButton from "@/components/buttons/dynamic-button"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { formatToIDR } from "@/utils/format-to-idr"
import { URIProduct } from "@/utils/url-product"
import Image from "next/image"
import Balancer from "react-wrap-balancer"

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")
  const [debounceSearchInput] = useDebounce(
    searchInput?.replace(/\s+/g, "-"),
    500,
  )

  const {
    data: searchProducts,
    isPending,
    isError,
  } = useQuery<ProductPostProps[]>({
    queryKey: ["search_input", debounceSearchInput],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/products?search=${debounceSearchInput}`,
      )
      return data.data
    },
  })

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="relative h-11 w-64 cursor-text rounded-full bg-secondary hover:bg-secondary-foreground/10">
          <span className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 font-medium text-muted-foreground/50">
            <SearchIcon className="size-6" strokeWidth={2} />
            <p className="capitalize">Search products</p>
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="h-max w-full py-8">
        <MaxWidthWrapper className="flex h-full max-w-6xl flex-col space-y-10">
          <div className="flex items-center justify-between px-4">
            <Logo />
            <div className="relative h-max w-full max-w-lg">
              <SearchIcon className="absolute left-2.5 top-1/2 size-6 -translate-y-1/2 stroke-[1.5] text-primary" />
              <Input
                className="h-12 border bg-transparent px-10 text-sm placeholder:capitalize focus:border-primary"
                placeholder="cari produk"
                spellCheck="false"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput.length > 0 && (
                <X
                  onClick={() => setSearchInput("")}
                  className="absolute right-2.5 top-1/2 size-4 -translate-y-1/2 cursor-pointer stroke-[1.5] text-primary"
                />
              )}
            </div>
            <CartAndFavouriteLink />
          </div>
          {debounceSearchInput.length === 0 ? null : isPending ? (
            <div className="flex w-full justify-center">
              <Loader2 className="h-6 w-6 animate-spin stroke-primary stroke-1" />
            </div>
          ) : isError ? (
            <div className="flex w-full justify-center">
              cek koneksi kamu dan coba lagi
            </div>
          ) : searchProducts?.length > 0 ? (
            <div className="result__search grid h-full max-h-[500px] w-full grid-cols-4 gap-6 overflow-y-auto px-4 transition-all">
              {searchProducts?.map((product) => (
                <SearchResults
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.images[0].image}
                  price={product.price}
                  closeSheet={() => setIsOpen(!isOpen)}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-full justify-center">
              productnya ngga ada nih...
            </div>
          )}
        </MaxWidthWrapper>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="link"
          className="absolute -bottom-14 right-8 px-0 font-canelaRegular text-xl tracking-wide text-background"
        >
          <ArrowUpFromDot className="mr-1.5 size-5 text-inherit" />
          Close
        </Button>
      </SheetContent>
    </Sheet>
  )
}

export const CartAndFavouriteLink = () => {
  const { favourites } = useSelector((state: RootState) => state.favourites)
  const { cart } = useSelector((state: RootState) => state.carts)
  return (
    <div className="flex items-center gap-6">
      <Link href="/account/favourite">
        <DynamicButton type="favourite" totalItems={favourites.length} />
      </Link>
      <Link href="/account/cart">
        <DynamicButton type="cart" totalItems={cart.length} />
      </Link>
    </div>
  )
}

export const SearchResults = ({
  id,
  title,
  image,
  price,
  closeSheet,
}: {
  id: string
  title: string
  image?: string
  price: number
  closeSheet: (isOpen: boolean) => void
}) => {
  const urlProduct = URIProduct({ title, id })

  return (
    <Link
      // @ts-ignore
      onClick={closeSheet}
      href={urlProduct}
      className="flex h-max w-full flex-col"
    >
      <div className="mb-3 h-[260px] w-full">
        <Image
          alt={title}
          src={image ?? ""}
          width={400}
          height={400}
          className="h-full w-full object-contain object-center"
        />
      </div>
      <h3 className="mb-1.5 text-base font-semibold">
        <Balancer>
          {title.length > 60 ? title.slice(0, 60) + "..." : title}
        </Balancer>
      </h3>
      <p className="text-base font-medium text-muted-foreground">
        {formatToIDR(price)}
      </p>
    </Link>
  )
}
