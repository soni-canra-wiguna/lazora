import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DeniedPage() {
  return (
    <div className="w-screen h-screen top-0 left-0 flex items-center justify-center overflow-hidden z-50 fixed bg-background">
      <div className="max-w-lg w-full mx-auto flex flex-col gap-4 items-center px-6 justify-center">
        <h1 className="text-4xl font-grostekBold">mau ngapain kamu?</h1>
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" /> ke halaman utama
          </Link>
        </Button>
      </div>
    </div>
  )
}