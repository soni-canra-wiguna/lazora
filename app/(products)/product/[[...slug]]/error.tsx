"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Error() {
  const [isRefresh, setIsRefresh] = useState(false)
  const router = useRouter()
  return (
    <MaxWidthWrapper className="mt-32 flex justify-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-medium text-2xl">
          ada yang salah nih, coba refresh!!
        </h1>
        {/* <Button
          onClick={() => {
            setIsRefresh(!isRefresh)
            router.refresh()
          }}
          className="w-max capitalize"
          variant="outline"
        >
          refresh page{" "}
          <RefreshCcw className={`size-4 ${isRefresh && "animate-spin"}`} />
        </Button> */}
      </div>
    </MaxWidthWrapper>
  )
}
