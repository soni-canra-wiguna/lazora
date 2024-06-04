/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gNQB2SwcZUa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Badge } from "@/components/ui/badge"
import getProducts from "@/services/get-products"
import { CATEGORIES } from "@/data/categories"
import { ProductCard } from "@/components/product-card"
import { RADIO_ITEM } from "@/data/radio-items"

export default function Component() {
  const { data, isPending, isError } = getProducts()
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c.toLowerCase() !== category)
      )
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const filteredProducts = useMemo(() => {
    let products = data
    if (selectedCategories.length > 0) {
      products = products?.filter((p) =>
        selectedCategories.includes(p.categories[0].title.toLowerCase())
      )
    }
    switch (sortBy) {
      case "featured":
        return products?.sort((a, b) => {
          const time1 = new Date(b.createdAt)
          const time2 = new Date(a.createdAt)
          return time1.getTime() - time2.getTime()
        })
      case "low":
        return products?.sort((a, b) => a.price - b.price)
      case "high":
        return products?.sort((a, b) => b.price - a.price)
      case "asc":
        return products?.sort((a, b) => a.title.localeCompare(b.title))
      case "desc":
        return products?.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return products
    }
  }, [data, sortBy, selectedCategories])

  return (
    <MaxWidthWrapper className="mt-32 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-6">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="text-base font-medium mb-2">Sort By</h3>
            <RadioGroup
              value={sortBy}
              onValueChange={handleSortChange}
              className="grid gap-2"
            >
              {RADIO_ITEM.map((radio) => (
                <Label
                  key={radio.title}
                  className="flex items-center gap-2 font-normal"
                >
                  <RadioGroupItem value={radio.value} />
                  {radio.title}
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h3 className="text-base font-medium mb-2">Category</h3>
            <div className="grid gap-2">
              {CATEGORIES.map((category) => (
                <Label
                  key={category.value}
                  className="flex items-center gap-2 font-normal capitalize"
                >
                  <Checkbox
                    checked={selectedCategories.includes(
                      category.value.toLowerCase()
                    )}
                    onCheckedChange={() =>
                      handleCategoryChange(category.value.toLowerCase())
                    }
                  />
                  {category.value}
                </Label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isPending ? (
          <div>pending dulu mase</div>
        ) : (
          filteredProducts?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.images[0]}
              title={product.title}
              categories={product.categories}
              price={product.price}
            />
          ))
        )}
      </div>
    </MaxWidthWrapper>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
