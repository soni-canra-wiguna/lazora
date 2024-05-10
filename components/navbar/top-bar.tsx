import Link from "next/link"
import MaxWidthWrapper from "../max-width-wrapper"
import { Button } from "../ui/button"
import { useUserClient } from "@/hook/use-user"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ArrowLeftFromLine,
  Heart,
  LayoutGrid,
  Settings,
  ShoppingCart,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"
import { useState } from "react"

const TopBar = () => {
  return (
    <div className="w-full bg-secondary">
      <MaxWidthWrapper className="flex items-center justify-end py-2">
        <div className="flex items-center divide-x-2 divide-secondary-foreground/30">
          <Button variant="link" className="py-0 leading-none h-max" asChild>
            <Link
              className="capitalize text-primary text-sm"
              href="/help/contact"
            >
              Contact
            </Link>
          </Button>
          <Button variant="link" className="py-0 leading-none h-max" asChild>
            <Link
              className="capitalize text-primary text-sm"
              href="/help/privacy-policy"
            >
              privacy and policy
            </Link>
          </Button>
          <Account />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default TopBar

const Account = () => {
  const { session, username, image, email, role } = useUserClient()
  const [isPopover, setIsPopover] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/")

      toast({
        title: "logout succes!!",
      })
    })
  }

  const URLS = [
    {
      href: "/account/favourite",
      icon: <Heart className="size-4" />,
      title: "favourite",
    },
    {
      href: "/account/cart",
      icon: <ShoppingCart className="size-4" />,
      title: "keranjang",
    },
    {
      href: "/account/pengaturan",
      icon: <Settings className="size-4" />,
      title: "pengaturan",
    },
    {
      href: "/dashbaord",
      icon: <LayoutGrid className="size-4" />,
      title: "dashboard",
    },
  ]

  const closePopover = () => {
    setIsPopover(!isPopover)
  }

  return (
    <>
      {!session ? (
        <Button variant="link" className="py-0 leading-none h-max pr-0" asChild>
          <Link className="capitalize text-primary text-sm" href="/sign-in">
            sign in
          </Link>
        </Button>
      ) : (
        <Popover open={isPopover} onOpenChange={setIsPopover}>
          <PopoverTrigger asChild data-state={open}>
            <Button variant="link" className="py-0 leading-none h-max pr-0">
              Hi, {username}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="mt-2 rounded-none w-[550px] h-[350px] p-0 flex"
          >
            <div className="w-[350px] border-r h-full overflow-hidden relative">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary" />
              <img
                alt={username ?? ""}
                src={image}
                className="size-full object-cover object-center selection:bg-transparent"
              />
              <div className="flex flex-col absolute bottom-5 left-5">
                <h2 className="text-xl font-semibold text-white capitalize">
                  {username}
                </h2>
                <p className="text-xs text-muted">{email}</p>
              </div>
            </div>
            <div className="w-[200px] h-full flex flex-col justify-between p-2">
              <div className="flex flex-col gap-1">
                {URLS.map(({ title, icon, href }) => (
                  <Link
                    key={title}
                    href={href}
                    onClick={closePopover}
                    className={`w-full flex items-center transition-all gap-2 px-3 py-2 hover:bg-secondary cursor-pointer ${
                      title === "dashboard" && role !== "SELLER" && "hidden"
                    }`}
                  >
                    {icon}
                    <p className="capitalize">{title}</p>
                  </Link>
                ))}
              </div>
              <div
                onClick={handleLogout}
                className="w-full flex items-center transition-all gap-2 px-3 py-2 hover:bg-secondary cursor-pointer"
              >
                <ArrowLeftFromLine className="size-4" />
                <p className="capitalize">keluar</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}
