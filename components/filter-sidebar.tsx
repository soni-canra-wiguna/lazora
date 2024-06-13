"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useMemo, useState } from "react"
import { ProductDataType, ProductPostProps } from "@/types"
import { CATEGORIES } from "@/data/categories"
import { RADIO_ITEM } from "@/data/radio-items"

interface Sorting {
  sortBy: string
  setSortBy: (sortBy: string) => void
}

const FilterSidebar = ({ sortBy, setSortBy }: Sorting) => {
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // const handleCategoryChange = (category: string) => {
  //   if (selectedCategories.includes(category)) {
  //     setSelectedCategories(selectedCategories.filter((c) => c !== category))
  //   } else {
  //     setSelectedCategories([...selectedCategories, category])
  //   }
  // }

  return (
    <div className="sticky top-[120px] h-screen w-1/6 bg-background">
      <h2 className="mb-4 text-xl font-medium capitalize">filter</h2>
      <div className="grid gap-4">
        <div>
          <h3 className="mb-2 text-base font-medium">Sort By</h3>
          <RadioGroup
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
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
        {/* filter categories */}
        <div>
          <h3 className="mb-2 text-base font-medium">Category</h3>
          <div className="grid gap-2">
            {CATEGORIES.map((category) => (
              <Label
                key={category.value}
                className="flex items-center gap-2 font-normal"
              >
                <Checkbox
                // checked={selectedCategories.includes(category.value)}
                // onCheckedChange={() => handleCategoryChange(category.value)}
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
