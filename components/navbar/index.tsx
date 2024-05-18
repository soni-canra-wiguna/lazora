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
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import NavList from "./nav-list"

const Navbar = () => {
  // const { visible } = useVisibleNavbar()
  // const isVisible = visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
  const patname = usePathname()
  const cartItems = 1

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
              <div className="flex items-center gap-24">
                <Logo />
                <NavList />
              </div>
              <div className="flex items-center gap-8 w-max">
                {/* <div className="h-11 w-40 bg-secondary rounded-full"></div> */}
                <Search />
                <Favourite />
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
