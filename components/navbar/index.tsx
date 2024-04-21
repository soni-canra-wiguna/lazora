"use client"

import useVisibleNavbar from "@/hook/use-visible-navbar"
import { usePathname } from "next/navigation"
import MaxWidthWrapper from "../max-width-wrapper"
import Search from "./search"
import { Bell, Heart, ShoppingCart, User2 } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

const disableNavbarWithFooter = ["/login", "/register"]

const Navbar = () => {
  // const { visible } = useVisibleNavbar()
  // const isVisible = visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
  const patname = usePathname()
  const cartItems = 1
  const favourites = 2

  return (
    <>
      {!disableNavbarWithFooter.includes(patname) && (
        <nav
          className={`fixed top-0 left-0 z-50 bg-white border-b flex items-center w-full transition duration-300 ease-in-out py-4
        `}
        >
          <MaxWidthWrapper className="flex items-center justify-between">
            <Link href="/" className="">
              <h1 className="text-2xl font-bold">Lazora</h1>
            </Link>
            <Search />
            <div className="flex items-center gap-5">
              <Bell className="size-6" strokeWidth={1.5} />
              <Favourite favourites={favourites} />
              <Cart cartItems={cartItems} />
              <Account />
            </div>
          </MaxWidthWrapper>
        </nav>
      )}
    </>
  )
}

export default Navbar

const Favourite = ({ favourites }: { favourites: number }) => {
  return (
    <div className="relative w-max h-max">
      <Heart className="size-6" strokeWidth={1.5} />
      {favourites > 0 && (
        <span className="absolute -right-1.5 -bottom-1 bg-primary text-background w-4 h-4 p-2 rounded-full border-[2px] border-white text-xs flex items-center justify-center">
          {favourites}
        </span>
      )}
    </div>
  )
}

const Cart = ({ cartItems }: { cartItems: number }) => {
  return (
    <div className="relative w-max h-max">
      <ShoppingCart className="size-6" strokeWidth={1.5} />
      {cartItems > 0 && (
        <span className="absolute -right-1.5 -bottom-1 bg-primary text-background w-4 h-4 p-2 rounded-full border-[2px] border-white text-xs flex items-center justify-center">
          {cartItems}
        </span>
      )}
    </div>
  )
}

const Account = () => {
  return (
    <Button variant="link" asChild className="px-0">
      <Link href="/sign-in" className="flex items-center gap-1.5">
        <User2 className="size-6" strokeWidth={1.5} />
        <span>account</span>
      </Link>
    </Button>
  )
}
