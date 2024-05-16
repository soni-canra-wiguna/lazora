import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowUpFromDot, Loader2, SearchIcon, X } from "lucide-react"
import MaxWidthWrapper from "../max-width-wrapper"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import Logo from "../logo"
import Cart from "./cart"
import { FavouriteButton } from "./favourite"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import Link from "next/link"
import { useDebounce } from "use-debounce"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductPostProps } from "@/types"
import { formatToIDR } from "@/utils/format-to-idr"
import { formatTitleProduct } from "@/utils/format-title-product"

const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")
  const [debounceSearchInput] = useDebounce(
    searchInput?.replace(/\s+/g, "-"),
    500
  )

  const {
    data: searchProducts,
    isPending,
    isError,
  } = useQuery<ProductPostProps[]>({
    queryKey: ["search_input", debounceSearchInput],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/products?search=${debounceSearchInput}`
      )
      return data.products
    },
  })

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="w-64 h-11 bg-secondary hover:bg-secondary-foreground/10 relative cursor-text rounded-full">
          <span className="flex items-center gap-2 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 font-medium">
            <SearchIcon className="size-6" strokeWidth={2} />
            <p>search products</p>
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="h-max w-full py-8">
        <MaxWidthWrapper className="max-w-6xl h-full flex flex-col space-y-10">
          <div className="flex items-center justify-between px-4">
            <Logo />
            <div className="max-w-lg w-full relative h-max">
              <SearchIcon className="size-6 text-primary absolute left-2.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
              <Input
                className="h-12 text-sm px-10 placeholder:capitalize border bg-transparent focus:border-primary"
                placeholder="cari produk"
                spellCheck="false"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput.length > 0 && (
                <X
                  onClick={() => setSearchInput("")}
                  className="size-4 text-primary absolute right-2.5 top-1/2 -translate-y-1/2 stroke-[1.5] cursor-pointer"
                />
              )}
            </div>
            <CartAndFavouriteLink />
          </div>
          {debounceSearchInput.length === 0 ? null : isPending ? (
            <div className="w-full flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin stroke-1 stroke-primary" />
            </div>
          ) : isError ? (
            <div className="w-full flex justify-center">
              cek koneksi kamu dan coba lagi
            </div>
          ) : searchProducts?.length > 0 ? (
            <div className="grid grid-cols-4 gap-6 w-full h-full max-h-[500px] overflow-y-auto result__search px-4 transition-all">
              {searchProducts?.map((product) => (
                <SearchResult
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
            <div className="w-full flex justify-center">
              productnya ngga ada nih...
            </div>
          )}
        </MaxWidthWrapper>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="link"
          className="absolute right-8 -bottom-14 text-xl text-background px-0 font-canelaRegular tracking-wide"
        >
          <ArrowUpFromDot className="text-inherit size-5 mr-1.5" />
          Close
        </Button>
      </SheetContent>
    </Sheet>
  )
}

export default Search

const SearchResult = ({
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
  const titleProduct = formatTitleProduct(title)
  const urlProdcut = `/product/${titleProduct}/${id}`

  console.log(title, price)

  return (
    <Link
      // @ts-ignore
      onClick={closeSheet}
      href={urlProdcut}
      className="flex flex-col w-full h-max"
    >
      <div className="w-full h-[260px] mb-3">
        <img
          alt={title}
          src={image}
          className="w-full h-full object-center object-contain"
        />
      </div>
      <h4 className="font-medium text-xl text-primary mb-1.5">{title}</h4>
      <p className="text-sm text-muted-foreground">{formatToIDR(price)}</p>
    </Link>
  )
}

const CartAndFavouriteLink = () => {
  const { favourites } = useSelector((state: RootState) => state.favourites)
  return (
    <div className="flex items-center gap-6">
      <Link href="/account/favourite">
        <FavouriteButton totalFavourites={favourites.length} />
      </Link>
      <Cart cartItems={1} />
    </div>
  )
}
