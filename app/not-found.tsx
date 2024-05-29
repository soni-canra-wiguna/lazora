import BackButton from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"

const NotFound = () => {
  return (
    <div className="w-screen h-screen top-0 left-0 flex items-center justify-center overflow-hidden z-50 fixed bg-background">
      <div className="max-w-lg w-full mx-auto flex flex-col gap-8 items-center px-6 justify-center">
        <h1 className="text-4xl font-grostekBold">page not found</h1>
        <div className="flex items-center gap-4">
          <BackButton />
          <Button variant="outline" asChild className="group">
            <Link href="/">
              ke halaman utama
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-all" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
