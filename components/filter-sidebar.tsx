"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useMemo, useState } from "react"
import { ProductDataType, ProductPostProps } from "@/types"
import { CATEGORIES } from "@/data/categories"
import { RADIO_ITEM } from "@/data/radio-items"

const FilterSidebar = ({ data }: { data?: ProductPostProps[] }) => {
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const filteredProducts = useMemo(() => {
    let products = data
    if (selectedCategories.length) {
      products = products?.filter((p) =>
        selectedCategories.includes(p.categories[0].title)
      )
    }
    switch (sortBy) {
      case "low":
        return products?.sort((a, b) => a.price - b.price)
      case "high":
        return products?.sort((a, b) => b.price - a.price)
      default:
        return products
    }
  }, [data, sortBy, selectedCategories])

  return (
    <div className="sticky top-[120px] w-1/6 h-screen bg-background">
      <h2 className="font-medium text-xl capitalize mb-4">filter</h2>
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
                className="flex items-center gap-2 font-normal"
              >
                <Checkbox
                  checked={selectedCategories.includes(category.value)}
                  onCheckedChange={() => handleCategoryChange(category.value)}
                />
                {category.value}
              </Label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
