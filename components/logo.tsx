import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import lazora from "@/public/lazora.svg"

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      {/* <Image alt="lazora logo" src={lazora} className="size-6" /> */}
      <h1 className="text-2xl font-canelaRegular text-inherit uppercase">
        Lazora
      </h1>
    </Link>
  )
}

export default Logo
