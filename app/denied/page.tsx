import BackButton from "@/components/buttons/back-button"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "unauthorized",
}

export default function DeniedPage() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-background">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-8 px-6">
        <Image
          alt="denied image"
          src="/denied.svg"
          width={500}
          height={500}
          className="aspect-square w-full max-w-sm grayscale selection:bg-transparent"
        />
        <div className="flex items-center gap-4">
          <BackButton />
          <Button variant="outline" asChild className="group">
            <Link href="/">
              ke halaman utama
              <ArrowRight className="ml-2 size-4 transition-all group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
