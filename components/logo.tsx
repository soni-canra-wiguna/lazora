import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import lazora from "@/public/lazora.png"

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <Image
        alt="lazora logo"
        src={lazora}
        className="size-6 transition-all duration-300 group-hover:scale-105"
      />
      <h1 className="text-2xl font-semibold uppercase text-inherit">Lazora</h1>
    </Link>
  )
}

export default Logo
