"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Image } from "lucide-react"

const PreviewImage = ({ imageUrl }: { imageUrl?: string }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="ml-2">
            <Image className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <img
            src={imageUrl}
            alt="image preview"
            className="w-full h-full boject-center"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreviewImage
