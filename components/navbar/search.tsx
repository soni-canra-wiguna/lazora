import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SearchIcon } from "lucide-react"

const Search = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="max-w-sm w-full h-11 bg-secondary hover:bg-secondary-foreground/10 relative cursor-text rounded-full">
          <span className="flex items-center gap-2 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 font-medium">
            <SearchIcon className="size-6" strokeWidth={2} />
            <p>search products</p>
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side="top">disini input ya</SheetContent>
    </Sheet>
  )
}

export default Search
