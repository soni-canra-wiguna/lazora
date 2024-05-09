"use client"

import useVisibleNavbar from "@/hook/use-visible-navbar"
import { usePathname } from "next/navigation"
import MaxWidthWrapper from "../max-width-wrapper"
import Search from "./search"
import Link from "next/link"
import { disableNavbarWithFooter } from "@/utils/disable-navbar-with-footer"
import TopBar from "./top-bar"
import Favourite from "./favourite"
import Cart from "./cart"
import Logo from "../logo"

const Navbar = () => {
  // const { visible } = useVisibleNavbar()
  // const isVisible = visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
  const patname = usePathname()
  const cartItems = 1
  const favourites = 2

  return (
    <>
      {!disableNavbarWithFooter.includes(patname) && (
        <div className="flex flex-col w-full items-start fixed top-0 left-0 z-50">
          <TopBar />
          <nav
            className={`
            bg-white border-b flex items-center w-full transition duration-300 ease-in-out py-4
        `}
          >
            <MaxWidthWrapper className="flex items-center justify-between">
              <Logo />
              <Search />
              <div className="flex items-center gap-8">
                <Favourite favourites={favourites} />
                <Cart cartItems={cartItems} />
              </div>
            </MaxWidthWrapper>
          </nav>
        </div>
      )}
    </>
  )
}

export default Navbar
