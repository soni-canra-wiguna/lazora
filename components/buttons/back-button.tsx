"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react"

const BackButton = () => {
  const router = useRouter()
  return (
    <Button variant="outline" className="group" onClick={() => router.back()}>
      <ArrowLeft className="mr-2 size-4 transition-all group-hover:-translate-x-1" />{" "}
      kembali
    </Button>
  )
}

export default BackButton
