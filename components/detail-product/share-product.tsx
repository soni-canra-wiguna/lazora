"use client"

import { LiaTelegram } from "react-icons/lia"
import { RiTwitterXLine, RiLinkedinBoxFill } from "react-icons/ri"
import { LineIcon } from "react-share"
import { ImFacebook, ImWhatsapp } from "react-icons/im"
import { formatToIDR } from "@/utils/format-to-idr"
import {
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import { CopyIcon, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"

export default function ShareProduct({
  image,
  title,
  price,
}: {
  image: string
  title: string
  price: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : ""
    setUrl(currentUrl)
  }, [router])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Tautan disalin ke clipboard!",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger style={{ all: "unset" }}>
        <button
          title="share product"
          className="group flex size-12 items-center justify-center rounded-full bg-background transition-all duration-300 hover:bg-primary"
        >
          <Share2
            strokeWidth={1.5}
            className="size-6 text-primary transition-all duration-300 group-hover:text-background"
          />
        </button>
      </DialogTrigger>
      <DialogContent closeIcon={true} className="max-w-[85vw] sm:max-w-xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center font-semibold leading-snug">
            Bagikan product dan dapatkan diskon hingga 0.5%
          </DialogTitle>
        </DialogHeader>
        <div className="mb-6 flex w-full gap-4 bg-secondary p-3">
          <div className="size-16 overflow-hidden">
            <Image
              src={image}
              alt={title}
              className="size-full object-cover"
              width={300}
              height={300}
            />
          </div>
          <div className="flex w-full flex-col gap-1 overflow-hidden">
            <h4 className="truncate text-sm font-semibold md:text-base">
              {title.slice(0, 45)}...
            </h4>
            <p className="text-sm text-muted-foreground">
              {formatToIDR(price)}
            </p>
          </div>
        </div>
        <div className="mb-3 flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Mau bagikan lewat mana?</h4>
          <SocialShare url={url} />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Coba bagikan lewat tautan</h4>
          <div className="relative w-full">
            <Input
              className="h-12 border border-primary bg-transparent pr-12 text-sm placeholder:capitalize"
              spellCheck="false"
              value={url}
            />
            <Button
              onClick={copyToClipboard}
              className="group absolute right-0 top-0 size-12"
              title="salin"
            >
              <CopyIcon className="size-6" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const SocialShare = ({ url }: { url: string }) => {
  return (
    <div className="flex w-full items-center gap-4 overflow-x-auto">
      <WhatsappShareButton url={url}>
        <button className="flex size-12 items-center justify-center rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20">
          <ImWhatsapp className="text-2xl" />
          <p className="sr-only">whatsapp</p>
        </button>
      </WhatsappShareButton>
      <FacebookShareButton url={url} title="facebook share">
        <button className="flex size-12 items-center justify-center rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20">
          <ImFacebook className="text-2xl" />
          <p className="sr-only">facebook</p>
        </button>
      </FacebookShareButton>
      <TelegramShareButton url={url} title="telegram">
        <button className="flex size-12 items-center justify-center rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20">
          <LiaTelegram className="text-2xl" />
          <p className="sr-only">telegram</p>
        </button>
      </TelegramShareButton>
      <TwitterShareButton url={url}>
        <button className="flex size-12 items-center justify-center rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20">
          <RiTwitterXLine className="text-2xl" />
          <p className="sr-only">twitter</p>
        </button>
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <button className="flex size-12 items-center justify-center rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20">
          <RiLinkedinBoxFill className="text-2xl" />
          <p className="sr-only">linked in</p>
        </button>
      </LinkedinShareButton>
      {/* <LineShareButton url={url}>
        <button className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20">
          <LineIcon className="text-2xl" />
          <p className="sr-only">line</p>
        </button>
      </LineShareButton> */}
    </div>
  )
}
