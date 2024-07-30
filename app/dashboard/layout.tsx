import SidebarDashboard from "@/components/dashboard/sidebar-dashboard"
import { LayoutType } from "@/types"

export default function DashboardLayout({ children }: LayoutType) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarDashboard />
      <div className="sm:pl-14">
        <div className="min-h-screen w-full overflow-y-auto px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  )
}
