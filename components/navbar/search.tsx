import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowUpFromDot, SearchIcon } from "lucide-react"
import MaxWidthWrapper from "../max-width-wrapper"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import AutoPlay from "embla-carousel-autoplay"

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
      <SheetContent side="top" className="h-[500px]">
        <MaxWidthWrapper className="max-w-5xl h-full flex flex-col gap-10">
          <Input
            className="rounded-full max-w-xl mx-auto h-12 text-base px-4 placeholder:capitalize"
            placeholder="cari produk"
            spellCheck="false"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <div className="grid grid-cols-12 size-full gap-4 overflow-hidden">
            <Category />
            <ResultSearch
              resultSearch={resultSearch}
              searchTitle={searchTitle}
            />
            <Recommendation />
          </div>
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

const Category = () => {
  return (
    <div className="col-span-2 w-full flex flex-col gap-4 overflow-y-auto categories_scrollbar">
      <div className="flex flex-col gap-2">
        <h4 className="text-muted-foreground/50 text-base font-medium capitalize">
          kategori
        </h4>
        <ul className="w-full flex flex-col gap-3">
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            bag
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            keycaps
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            keyboard
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            shoes
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            smartphone
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-muted-foreground/50 text-base font-medium capitalize">
          popular
        </h4>
        <ul className="w-full flex flex-col gap-3">
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            bag
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            keycaps
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            keyboard
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            shoes
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            smartphone
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-muted-foreground/50 text-base font-medium capitalize">
          most favourite
        </h4>
        <ul className="w-full flex flex-col gap-3">
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            bag
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            keycaps
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            keyboard
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            shoes
          </li>
          <li className="hover:underline capitalize text-sm truncate cursor-pointer w-max">
            smartphone
          </li>
        </ul>
      </div>
    </div>
  )
}

const ResultSearch = ({
  resultSearch,
  searchTitle,
}: {
  resultSearch: number
  searchTitle: string
}) => {
  return (
    <div className="col-span-6 w-full h-full flex flex-col gap-2 overflow-hidden">
      <h4 className="text-muted-foreground/50 text-base font-medium capitalize h-max">
        hasil pencarian
      </h4>
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

const Recommendation = () => {
  return (
    <div className="col-span-4 w-full flex flex-col gap-2">
      <h4 className="text-muted-foreground/50 text-base font-medium capitalize">
        rekomendasi
      </h4>
      <div className="w-full h-full bg-secondary">
        <Carousel
          plugins={[
            AutoPlay({
              delay: 4500,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="flex-2 bg-red-300">1</div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex-2 bg-red-300">2</div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex-2 bg-red-300">3</div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
