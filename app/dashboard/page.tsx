"use client"

import { useUserClient } from "@/hook/use-user"
import Image from "next/image"

const DashboardPage = () => {
  const { session } = useUserClient()
  return (
    <div className="flex w-full flex-col">
      {session?.user.role === "VIEWER" && (
        <div className="w-full border border-main/30 bg-main/10 px-6 py-4 font-medium text-main">
          Kamu seorang viewer, kamu tidak bisa melakukan aksi apapun!!
        </div>
      )}
      <div className="mx-auto mt-24 w-full max-w-lg flex-col items-center gap-8 px-6">
        <Image
          alt="image not found"
          src="/building-process.svg"
          width={500}
          height={500}
          className="mx-auto aspect-square w-full max-w-sm grayscale selection:bg-transparent"
        />
        <h4 className="text-center text-xl font-medium">Building Process..</h4>
      </div>
    </div>
  )
}

export default DashboardPage
