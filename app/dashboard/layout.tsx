import SidebarDashboard from "./_components/sidebar-dashboard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarDashboard />
      <div className="sm:pl-14">
        <div className="px-6 py-6 w-full min-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
