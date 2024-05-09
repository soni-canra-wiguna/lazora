import { cn } from "@/lib/utils"
import Link from "next/link"

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("", className)}>
      <h1 className="text-2xl font-canelaRegular text-inherit">Lazora</h1>
    </Link>
  )
}

export default Logo
