import CustomTooltip from "@/components/custom-tooltip"
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Square,
  SquareUserRound,
} from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    {
      title: "dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "orders",
      href: "/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "products",
      href: "/dashboard/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "banner",
      href: "/dashboard/banner",
      icon: <Square className="h-5 w-5" />,
    },
    {
      title: "analytics",
      href: "/dashboard/analytics",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: "settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-3 px-2 py-4">
          <CustomTooltip title="homepage" side="right">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <span className="mr-2">l</span>
            </Link>
          </CustomTooltip>
          {links.map((link) => (
            <CustomTooltip key={link.title} title={link.title} side="right">
              <Link
                href={link.href}
                className="flex h-9 items-center justify-center text-primary transition-colors hover:bg-muted w-full apsect-square"
              >
                {link.icon}
                <span className="sr-only">{link.title}</span>
              </Link>
            </CustomTooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <CustomTooltip title="account" side="right">
            <Link
              href="/dashboard/account"
              className="flex h-9 items-center justify-center text-primary transition-colors hover:bg-muted w-full apsect-square"
            >
              <SquareUserRound className="h-5 w-5" />
              <span className="sr-only">account</span>
            </Link>
          </CustomTooltip>
        </nav>
      </aside>
      <div className="sm:pl-14">
        <div className="px-6 py-6 w-full min-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
