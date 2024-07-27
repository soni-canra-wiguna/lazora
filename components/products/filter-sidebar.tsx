"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CATEGORIES } from "@/constants/categories"
import { ITEMS_SORT_BY } from "@/constants/items-sort-by"
import { useQueryState } from "nuqs"

export default function FilterSidebar() {
  const [sortBy, setSortBy] = useQueryState("sortBy", { history: "push" })

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
            value={sortBy || ""}
            onValueChange={(value) => setSortBy(value)}
            className="grid gap-2"
          >
            {ITEMS_SORT_BY.map((item) => (
              <Label
                key={item.title}
                className="flex items-center gap-2 font-normal"
              >
                <RadioGroupItem value={item.value} />
                {item.title}
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

export const SuspenseFilterSidebar = () => {
  return (
    <div className="sticky top-[120px] h-screen w-1/6 bg-background">
      <h2 className="mb-4 text-xl font-medium capitalize">filter</h2>
      <div className="grid gap-4">
        <div>
          <h3 className="mb-2 text-base font-medium">Sort By</h3>
          <RadioGroup value={"featured"} className="grid gap-2">
            {ITEMS_SORT_BY.map((item) => (
              <Label
                key={item.title}
                className="flex items-center gap-2 font-normal"
              >
                <RadioGroupItem value={item.value} />
                {item.title}
              </Label>
            ))}
          </RadioGroup>
        </div>
        <div>
          <h3 className="mb-2 text-base font-medium">Category</h3>
          <div className="grid gap-2">
            {CATEGORIES.map((category) => (
              <Label
                key={category.value}
                className="flex items-center gap-2 font-normal"
              >
                <Checkbox />
                {category.value}
              </Label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
