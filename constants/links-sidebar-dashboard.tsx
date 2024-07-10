import {
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  Square,
} from "lucide-react"

export const LINKS_SIDEBAR_DASHBOARD = [
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
    href: "/dashboard/banners",
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
