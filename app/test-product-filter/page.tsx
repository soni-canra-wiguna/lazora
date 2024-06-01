// @ts-nocheck

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

export default function Component() {
  const products = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Wireless Headphones",
      price: 99.99,
      rating: 4.5,
      category: "Electronics",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Leather Backpack",
      price: 149.99,
      rating: 4.2,
      category: "Bags",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Outdoor Camping Gear",
      price: 79.99,
      rating: 4.7,
      category: "Outdoors",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Ergonomic Office Chair",
      price: 299.99,
      rating: 4.3,
      category: "Furniture",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Stylish Sunglasses",
      price: 49.99,
      rating: 4.6,
      category: "Accessories",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Smart Home Hub",
      price: 129.99,
      rating: 4.4,
      category: "Electronics",
    },
    {
      id: 7,
      image: "/placeholder.svg",
      title: "Cozy Throw Blanket",
      price: 59.99,
      rating: 4.8,
      category: "Home",
    },
    {
      id: 8,
      image: "/placeholder.svg",
      title: "Fitness Tracker Watch",
      price: 89.99,
      rating: 4.5,
      category: "Wearables",
    },
  ]
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState([])
  const handleSortChange = (value) => {
    setSortBy(value)
  }
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }
  const filteredProducts = useMemo(() => {
    let filtered = products
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      )
    }
    switch (sortBy) {
      case "low":
        return filtered.sort((a, b) => a.price - b.price)
      case "high":
        return filtered.sort((a, b) => b.price - a.price)
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating)
      default:
        return filtered
    }
  }, [products, sortBy, selectedCategories])

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
                  checked={selectedCategories.includes("Electronics")}
                  onCheckedChange={() => handleCategoryChange("Electronics")}
                />
                Electronics
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedCategories.includes("Bags")}
                  onCheckedChange={() => handleCategoryChange("Bags")}
                />
                Bags
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedCategories.includes("Outdoors")}
                  onCheckedChange={() => handleCategoryChange("Outdoors")}
                />
                Outdoors
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedCategories.includes("Furniture")}
                  onCheckedChange={() => handleCategoryChange("Furniture")}
                />
                Furniture
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedCategories.includes("Accessories")}
                  onCheckedChange={() => handleCategoryChange("Accessories")}
                />
                Accessories
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedCategories.includes("Home")}
                  onCheckedChange={() => handleCategoryChange("Home")}
                />
                Home
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedCategories.includes("Wearables")}
                  onCheckedChange={() => handleCategoryChange("Wearables")}
                />
                Wearables
              </Label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden"
          >
            <Link href="#" className="block" prefetch={false}>
              <img
                src="/placeholder.svg"
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center gap-0.5 text-yellow-500">
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                </div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({product.rating})
                </span>
              </div>
              <div className="text-xl font-semibold">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

function StarIcon(props) {
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
