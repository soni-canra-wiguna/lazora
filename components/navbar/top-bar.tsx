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
  ChevronDown,
  Globe,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"
import { useState } from "react"
import { cn } from "@/lib/utils"

const TopBar = () => {
  return (
    <div className="w-full bg-secondary">
      <MaxWidthWrapper className="flex items-center justify-end py-2">
        <div className="flex items-center divide-x-2 divide-secondary-foreground/30">
          <ToggleLanguange />
          <Button variant="link" className="h-max py-0 leading-none" asChild>
            <Link className="text-sm capitalize text-primary" href="/help">
              help
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
      href: "/dashboard",
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
        <Button variant="link" className="h-max py-0 pr-0 leading-none" asChild>
          <Link className="text-sm capitalize text-primary" href="/sign-in">
            sign in
          </Link>
        </Button>
      ) : (
        <Popover open={isPopover} onOpenChange={setIsPopover}>
          <PopoverTrigger asChild>
            <Button variant="link" className="h-max py-0 pr-0 leading-none">
              Hi, {username}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="mt-2 flex h-[350px] w-[550px] rounded-none p-0"
          >
            <div className="relative h-full w-[350px] overflow-hidden border-r">
              <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-primary" />
              <img
                alt={username ?? ""}
                src={image || "/grainy.jpg"}
                className="size-full object-cover object-center selection:bg-transparent"
              />
              <div className="absolute bottom-5 left-5 flex flex-col">
                <h2 className="text-xl font-semibold capitalize text-white">
                  {username}
                </h2>
                <p className="text-xs text-muted">{email}</p>
              </div>
            </div>
            <div className="flex h-full w-[200px] flex-col justify-between p-2">
              <div className="flex flex-col gap-1">
                {URLS.map(({ title, icon, href }) => (
                  <Link
                    key={title}
                    href={href}
                    onClick={closePopover}
                    className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-all hover:bg-secondary ${
                      title === "dashboard" && role === "BUYER" && "hidden"
                    }`}
                  >
                    {icon}
                    <p className="capitalize">{title}</p>
                  </Link>
                ))}
              </div>
              <div
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-all hover:bg-secondary"
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

const ToggleLanguange = () => {
  const [isPopover, setIsPopover] = useState(false)
  const [language, setLanguage] = useState("ID")

  const toggleSwitchLanguage = (language: string) => {
    setLanguage(language)
    setIsPopover(false)
  }

  return (
    <Popover open={isPopover} onOpenChange={setIsPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="flex h-max items-center gap-2 py-0 leading-none"
          aria-label="toggle language"
        >
          <Globe strokeWidth={1.5} className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="mt-2 flex h-max w-[120px] flex-col rounded-none px-0 py-2"
      >
        <div
          onClick={() => toggleSwitchLanguage("ID")}
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 px-3 py-1 hover:bg-secondary",
            language === "ID" && "bg-secondary",
          )}
        >
          <p className="text-sm font-medium">Indonesia</p>
        </div>
        <div
          onClick={() => toggleSwitchLanguage("EN")}
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 px-3 py-1 hover:bg-secondary",
            language === "EN" && "bg-secondary",
          )}
        >
          <p className="text-sm font-medium">English</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
