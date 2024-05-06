"use client"

import useVisibleNavbar from "@/hook/use-visible-navbar"
import { usePathname } from "next/navigation"
import MaxWidthWrapper from "../max-width-wrapper"
import Search from "./search"
import { Bell, Heart, ShoppingCart, User2 } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { disableNavbarWithFooter } from "@/utils/disable-navbar-with-footer"
import { useUserClient } from "@/hook/use-user"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import defaultAvatar from "@/public/auth-image2.jpg"
import Image from "next/image"
import Notification from "./notification"

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
          <div className="w-full bg-[#e7e7e7]">
            <MaxWidthWrapper className="flex items-center justify-end py-2">
              <div className="flex items-center divide-x-2 divide-secondary-foreground/30">
                <Button
                  variant="link"
                  className="py-0 leading-none h-max"
                  asChild
                >
                  <Link
                    className="capitalize text-primary text-sm"
                    href="/help/contact"
                  >
                    Contact
                  </Link>
                </Button>
                <Button
                  variant="link"
                  className="py-0 leading-none h-max"
                  asChild
                >
                  <Link
                    className="capitalize text-primary text-sm"
                    href="/help/privacy-policy"
                  >
                    privacy and policy
                  </Link>
                </Button>
                <Button
                  variant="link"
                  className="py-0 leading-none h-max pr-0"
                  asChild
                >
                  <Link
                    className="capitalize text-primary text-sm"
                    href="/sign-in"
                  >
                    sign in
                  </Link>
                </Button>
              </div>
            </MaxWidthWrapper>
          </div>

          <nav
            className={`
            bg-white border-b flex items-center w-full transition duration-300 ease-in-out py-4
        `}
          >
            <MaxWidthWrapper className="flex items-center justify-between">
              <Link href="/" className="">
                <h1 className="text-2xl font-bold">Lazora</h1>
              </Link>
              <Search />
              <div className="flex items-center gap-6">
                <Notification />
                <Favourite favourites={favourites} />
                <Cart cartItems={cartItems} />
                {/* <Account /> */}
              </div>
            </MaxWidthWrapper>
          </nav>
        </div>
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
  const { session, username, image } = useUserClient()

  return (
    <>
      {!session ? (
        <Link href="/sign-in" className="flex items-center gap-1.5">
          <User2 className="size-6" strokeWidth={1.5} />
          <span>account</span>
        </Link>
      ) : (
        <Link href="/account">
          <div className="size-8 rounded-full shimmer hover:ring-4 hover:ring-main/20 transition duration-300 ease-in-out">
            <Image
              className="size-full object-cover object-center"
              src={defaultAvatar}
              alt="avatar image"
              width={300}
              height={300}
            />
          </div>
          {/* <Avatar className="size-8">
            <AvatarImage src={session?.user.image || "/auth-image2.jpg"} />
            <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
          </Avatar> */}
        </Link>
      )}
    </>
  )
}
