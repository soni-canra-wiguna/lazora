import { cn } from "@/lib/utils"

export const FooterItem = ({
  className,
  title,
  children,
}: {
  className?: string
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className={cn("", className)}>
      <h3 className="mb-5 text-lg font-semibold text-primary">{title}</h3>
      {children}
    </div>
  )
}
