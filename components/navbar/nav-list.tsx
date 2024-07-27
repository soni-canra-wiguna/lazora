import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"
import React from "react"
import { CATEGORIES } from "@/constants/categories"
import { formatTitleProduct } from "@/utils/format-title-product"

export default function NavList() {
  return (
    <nav className="mt-1 flex items-center gap-8">
      <Link
        className="text-sm font-medium capitalize leading-none text-primary hover:text-secondary-foreground/70"
        href="/p?sortBy=featured"
      >
        products
      </Link>
      <CategoryMenu />
      <Link
        className="text-sm font-medium capitalize leading-none text-primary hover:text-secondary-foreground/70"
        href="/blog"
      >
        Blog
      </Link>
    </nav>
  )
}

const CategoryMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-0 capitalize text-primary hover:bg-transparent hover:text-secondary-foreground/70">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="rounded-none px-0 py-2 md:rounded-none">
            <ul className="flex h-max w-60 flex-col space-y-2.5">
              {CATEGORIES.map((category) => (
                <li
                  key={category.title}
                  className="p-2 px-6 hover:bg-secondary"
                >
                  <Link
                    href={`/c/${formatTitleProduct(category.value)}`}
                    className="flex w-full items-center gap-2.5 text-sm capitalize"
                  >
                    {category.icon}
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
