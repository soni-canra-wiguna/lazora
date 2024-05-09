import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowUpFromDot, SearchIcon, X } from "lucide-react"
import MaxWidthWrapper from "../max-width-wrapper"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import Logo from "../logo"
import Cart from "./cart"
import Favourite from "./favourite"

const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchTitle, setSearchTitle] = useState<string>("")
  const resultSearch = 2

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="max-w-sm w-full h-11 bg-secondary hover:bg-secondary-foreground/10 relative cursor-text rounded-full">
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
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              {searchTitle.length > 0 && (
                <X
                  onClick={() => setSearchTitle("")}
                  className="size-4 text-primary absolute right-2.5 top-1/2 -translate-y-1/2 stroke-[1.5] cursor-pointer"
                />
              )}
            </div>
            <div className="flex items-center gap-6">
              <Favourite favourites={4} />
              <Cart cartItems={1} />
            </div>
          </div>
          {searchTitle.length > 10 && (
            <div className="grid grid-cols-4 gap-6 w-full h-full max-h-[500px] overflow-y-auto result__search px-4 transition-all">
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>
              <div className="w-full aspect-square bg-secondary"></div>

              {/* <ResultSearch
              resultSearch={resultSearch}
              searchTitle={searchTitle}
            /> */}
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

const ResultSearch = ({
  resultSearch,
  searchTitle,
}: {
  resultSearch: number
  searchTitle: string
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-hidden">
      {resultSearch > 0 ? (
        <div className="flex-1 grid grid-cols-1 gap-2 overflow-y-auto result__search">
          <div className="w-full h-20 bg-secondary"></div>
          <div className="w-full h-20 bg-secondary"></div>
          <div className="w-full h-20 bg-secondary"></div>
          <div className="w-full h-20 bg-secondary"></div>
          <div className="w-full h-20 bg-secondary"></div>
          <div className="w-full h-20 bg-secondary"></div>
          <div className="w-full h-20 bg-secondary"></div>
        </div>
      ) : (
        searchTitle.length === 0 && (
          <div className="size-full flex flex-col gap-2 items-center justify-center">
            coba cari sesuatu
          </div>
        )
      )}
      {searchTitle.length > 0 && resultSearch === 0 && (
        <div className="size-full flex flex-col gap-2 items-center justify-center">
          hasil pencariannya ngga ada nih
        </div>
      )}
    </div>
  )
}
