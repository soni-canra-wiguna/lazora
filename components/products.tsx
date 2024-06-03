"use client"

import { getShuffleProducts } from "@/services/get-products"
import { ProductCard2 } from "./product-card"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"

const ListProducts = () => {
  const { data, isPending, isError } = getShuffleProducts()
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">Products</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-full">
              Sort by <ChevronDown className="size-4 ml-2" />{" "}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="rounded-none shadow-none">
            price
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {isPending
          ? "loading data..."
          : isError
          ? "productnya kenapa nih"
          : data?.map(({ id, images, title, categories, price }) => (
              <ProductCard2
                key={id + title}
                id={id}
                image={images[0]}
                title={title}
                categories={categories}
                price={price}
              />
            ))}
      </div>
    </div>
  )
}

export default ListProducts
