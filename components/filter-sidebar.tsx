"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 500])

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)
  }
  return (
    <div className="sticky top-[120px] w-1/6 h-screen bg-background">
      <h2 className="font-medium text-xl capitalize mb-4">filter</h2>
      <div className="grid gap-4">
        <div>
          <h3 className="text-base font-medium mb-2">Sort By</h3>
          <RadioGroup
            // value={sortBy}
            // onValueChange={handleSortChange}
            className="grid gap-2"
          >
            <Label className="flex items-center gap-2 font-normal">
              <RadioGroupItem value="featured" />
              Featured
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <RadioGroupItem value="low" />
              Price: Low to High
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <RadioGroupItem value="high" />
              Price: High to Low
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <RadioGroupItem value="rating" />
              Rating
            </Label>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-base font-medium mb-2">Category</h3>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox
              // checked={selectedCategories.includes("Electronics")}
              // onCheckedChange={() => handleCategoryChange("Electronics")}
              />
              Keyboard
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox
              // checked={selectedCategories.includes("Bags")}
              // onCheckedChange={() => handleCategoryChange("Bags")}
              />
              Deskmat
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox
              // checked={selectedCategories.includes("Outdoors")}
              // onCheckedChange={() => handleCategoryChange("Outdoors")}
              />
              Cable
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox
              // checked={selectedCategories.includes("Furniture")}
              // onCheckedChange={() => handleCategoryChange("Furniture")}
              />
              Mouse
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox
              // checked={selectedCategories.includes("Accessories")}
              // onCheckedChange={() => handleCategoryChange("Accessories")}
              />
              Switch
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox
              // checked={selectedCategories.includes("Home")}
              // onCheckedChange={() => handleCategoryChange("Home")}
              />
              Keycaps
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox
              // checked={selectedCategories.includes("Wearables")}
              // onCheckedChange={() => handleCategoryChange("Wearables")}
              />
              Barebone
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox
              // checked={selectedCategories.includes("Wearables")}
              // onCheckedChange={() => handleCategoryChange("Wearables")}
              />
              Sticker
            </Label>
          </div>
        </div>
        {/* <div>
          <h3 className="text-base font-medium mb-2">Price Range</h3>
          <Slider
            min={0}
            max={500}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default FilterSidebar
