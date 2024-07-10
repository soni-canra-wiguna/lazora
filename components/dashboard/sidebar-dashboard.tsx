import CustomTooltip from "@/components/custom-tooltip"
import { LINKS_SIDEBAR_DASHBOARD } from "@/constants/links-sidebar-dashboard"
import { SquareUserRound } from "lucide-react"
import Link from "next/link"

const SidebarDashboard = () => {
  return (
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
        {LINKS_SIDEBAR_DASHBOARD.map((link) => (
          <CustomTooltip key={link.title} title={link.title} side="right">
            <Link
              href={link.href}
              className="apsect-square flex h-9 w-full items-center justify-center text-primary transition-colors hover:bg-muted"
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
            className="apsect-square flex h-9 w-full items-center justify-center text-primary transition-colors hover:bg-muted"
          >
            <SquareUserRound className="h-5 w-5" />
            <span className="sr-only">account</span>
          </Link>
        </CustomTooltip>
      </nav>
    </aside>
  )
}

export default SidebarDashboard
