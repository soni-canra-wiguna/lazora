"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Error() {
  const [isRefresh, setIsRefresh] = useState(false)
  const router = useRouter()
  return (
    <MaxWidthWrapper className="mt-40 flex min-h-screen max-w-lg flex-col items-center gap-8 px-6">
      <Image
        alt="image not found"
        src="/notfound.svg"
        width={500}
        height={500}
        className="aspect-square w-full max-w-sm grayscale selection:bg-transparent"
      />
      <h4 className="text-center text-xl font-medium">
        Yahh error nih, coba refresh lagi deh...
      </h4>
    </MaxWidthWrapper>
  )
}
