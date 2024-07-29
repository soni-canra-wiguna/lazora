"use client"

import { usePathname } from "next/navigation"
import MaxWidthWrapper from "@/components/layouts/max-width-wrapper"
import SearchProducts from "@/components/search"
import { disableNavbarWithFooter } from "@/constants/disable-navbar-with-footer"
import TopBar from "./top-bar"
import Favourite from "@/components/favourite"
import Cart from "@/components/cart"
import Logo from "@/components/logo"
import NavList from "./nav-list"

const Navbar = () => {
  const patname = usePathname()

  return (
    <>
      {!disableNavbarWithFooter.includes(patname) && (
        <header className="fixed left-0 top-0 z-50 flex w-full flex-col items-start">
          <TopBar />
          <div
            className={`flex w-full items-center border-b bg-white py-4 transition duration-300 ease-in-out`}
          >
            <MaxWidthWrapper className="flex items-center justify-between">
              <div className="flex items-center gap-24">
                <Logo />
                <NavList />
              </div>
              <div className="flex w-max items-center gap-8">
                <SearchProducts />
                <Favourite />
                <Cart />
              </div>
            </MaxWidthWrapper>
          </div>
        </header>
      )}
    </>
  )
}

export default Navbar
