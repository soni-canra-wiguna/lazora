"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  CopyIcon,
  EllipsisVertical,
  Facebook,
  Share2,
  ShoppingCart,
  Trash2,
  Wand2,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import AutoPlay from "embla-carousel-autoplay"
import { UploadDropzone } from "@/lib/uploadthing"
import { useEffect, useState } from "react"
import Image from "next/image"
import { UploadFileResponse } from "uploadthing/client"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import { useRouter } from "next/navigation"
import { SlSocialFacebook } from "react-icons/sl"
import { FaWhatsapp } from "react-icons/fa"
import { LiaTelegram } from "react-icons/lia"
import {
  RiTwitterXLine,
  RiLinkedinFill,
  RiLinkedinBoxFill,
} from "react-icons/ri"
import { LineIcon } from "react-share"
import { ImFacebook, ImWhatsapp } from "react-icons/im"
import { formatToIDR } from "@/utils/format-to-idr"

export default function ComponentsUI() {
  return (
    <div className="mx-auto my-40 flex min-h-screen w-full max-w-[1366px] flex-col gap-10">
      <ColorsUI />
      <ButtonUI />
      <CardUI />
      <InputUI />
      <ModalUI />
      <SheetUI />
      <DropdownUI />
      <CarouselUI />
      <FileUploadComp />
      <DeleteModal />
      <ScrollAreaComp />
      <ModalImageSlider />
      <ModalShareProduct />
    </div>
  )
}

const WrapperUI = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium">{title}</h1>
      {children}
    </div>
  )
}

const ColorsUI = () => {
  return (
    <WrapperUI title="colors">
      <div className="grid w-full grid-cols-4 gap-4 text-green-500">
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-background">
          background
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-foreground">
          foreground
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-card">
          card
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-card-foreground">
          card foreground
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-primary">
          primary
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-primary-foreground">
          primary foreground
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-secondary">
          secondary
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-secondary-foreground">
          secondary foreground
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-muted">
          muted
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-muted-foreground">
          muted foreground
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-accent">
          accent
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-accent-foreground">
          accent foreground
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-destructive">
          destructive
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-destructive-foreground">
          destructive foreground
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-border">
          border
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-input">
          input
        </div>
        <div className="flex aspect-square h-20 w-full items-center justify-center border border-green-500 bg-ring">
          ring
        </div>
      </div>
    </WrapperUI>
  )
}

const ButtonUI = () => {
  return (
    <WrapperUI title="buttons(sm/default/lg)">
      <div className="mb-5 flex flex-wrap gap-4">
        <Button size="sm">default</Button>
        <Button size="sm" variant="secondary">
          secondary
        </Button>
        <Button size="sm" variant="destructive">
          destructive
        </Button>
        <Button size="sm" variant="ghost">
          ghost
        </Button>
        <Button size="sm" variant="link">
          link
        </Button>
        <Button size="sm" variant="outline">
          outline
        </Button>
      </div>
      <div className="mb-5 flex flex-wrap gap-4">
        <Button>default</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
      </div>
      <div className="mb-5 flex flex-wrap gap-4">
        <Button size="lg">default</Button>
        <Button size="lg" variant="secondary">
          secondary
        </Button>
        <Button size="lg" variant="destructive">
          destructive
        </Button>
        <Button size="lg" variant="ghost">
          ghost
        </Button>
        <Button size="lg" variant="link">
          link
        </Button>
        <Button size="lg" variant="outline">
          outline
        </Button>
      </div>
    </WrapperUI>
  )
}

const CardUI = () => {
  return (
    <WrapperUI title="card">
      <div className="flex flex-wrap gap-4">
        <Card className="aspect-video w-64">hello</Card>
        <Card className="aspect-video w-64 border-primary shadow-none">
          hello
        </Card>
      </div>
    </WrapperUI>
  )
}

const InputUI = () => {
  return (
    <WrapperUI title="input">
      <div className="flex flex-col gap-4">
        <Input
          spellCheck="false"
          className="max-w-md"
          placeholder="type something"
        />
        <div className="flex max-w-md flex-col gap-2.5">
          <Label htmlFor="email">email</Label>
          <Input
            type="email"
            id="email"
            className="max-w-md"
            placeholder="type something"
          />
        </div>
      </div>
    </WrapperUI>
  )
}

const ModalUI = () => {
  return (
    <WrapperUI title="dialog/modal">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-max" size="lg">
            dialog
          </Button>
        </DialogTrigger>
        <DialogContent className="h-full max-h-[90vh] max-w-7xl">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-max" size="lg">
                dialog
              </Button>
            </DialogTrigger>
            <DialogContent className="aspect-square max-w-xl">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    </WrapperUI>
  )
}

const SheetUI = () => {
  return (
    <WrapperUI title="sheet">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="size-6" strokeWidth={1.5} />
          </Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </WrapperUI>
  )
}

const DropdownUI = () => {
  return (
    <WrapperUI title="dropdown">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical strokeWidth={1.5} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </WrapperUI>
  )
}

const CarouselUI = () => {
  return (
    <WrapperUI title="carousel">
      <Carousel
        plugins={[
          AutoPlay({
            delay: 4500,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="h-[400px] w-full max-w-xl"
      >
        <CarouselContent>
          <CarouselItem>
            <div className="h-20 w-full bg-red-300">1</div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-20 w-full bg-red-300">2</div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-20 w-full bg-red-300">3</div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-20 w-full bg-red-300">4</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </WrapperUI>
  )
}

const FileUploadComp = () => {
  const [images, setImages] = useState<UploadFileResponse[] | undefined>()
  return (
    <WrapperUI title="file upload demo">
      <UploadDropzone
        endpoint="products"
        onClientUploadComplete={(res) => {
          setImages(res)
          toast({
            title: "succes uploaded",
            variant: "success",
          })
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "succes uploaded",
            description: `ERROR! ${error.message}`,
            variant: "destructive",
          })
        }}
      />
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-3 gap-4">
        {images?.length ?? 0 > 0 ? (
          images?.map((image) => {
            return (
              <div key={image.name} className="flex flex-col gap-4 p-4">
                <div className="aspect-square w-full">
                  <Image
                    alt={image.name}
                    src={image.url}
                    width={500}
                    height={500}
                    className="size-full object-cover object-center"
                  />
                </div>
                <h2 className="text-lg font-medium text-zinc-900">
                  {image.name}
                </h2>
              </div>
            )
          })
        ) : (
          <p className="text-black">belum ada review nih</p>
        )}
      </div>
    </WrapperUI>
  )
}

const DeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openCloseModalDialog = () => {
    setIsOpen(!isOpen)
  }
  return (
    <WrapperUI title="delete modal">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-max rounded-full border-2 border-dashed border-red-500/50 bg-red-500/30 text-red-500 hover:bg-red-500/40">
            delete modal <Trash2 className="ml-2 size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent closeIcon={false} className="max-w-[85vw] sm:max-w-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-left font-semibold leading-snug">
              Apakah anda yakin ingin menghapus banner ini?
            </DialogTitle>
            <DialogDescription className="text-left">
              aksi ini akan menghapus banner secara permanen dari server, apakah
              anda yakin ingin menghapusnya?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex w-full items-center justify-end gap-4 sm:flex-row">
            <Button
              className="w-full sm:w-max"
              variant="outline"
              onClick={openCloseModalDialog}
            >
              Close
            </Button>
            <Button className="w-full sm:w-max">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </WrapperUI>
  )
}

const ScrollAreaComp = () => {
  const works = [
    {
      artist: "Ornella Binni",
      art: "/placeholder.jpg",
    },
    {
      artist: "Tom Byrom",
      art: "/placeholder.jpg",
    },
    {
      artist: "Vladimir Malyavko",
      art: "/placeholder.jpg",
    },
    {
      artist: "Ornella Binni",
      art: "/placeholder.jpg",
    },
    {
      artist: "Tom Byrom",
      art: "/placeholder.jpg",
    },
    {
      artist: "Vladimir Malyavko",
      art: "/placeholder.jpg",
    },
    {
      artist: "Ornella Binni",
      art: "/placeholder.jpg",
    },
    {
      artist: "Tom Byrom",
      art: "/placeholder.jpg",
    },
    {
      artist: "Vladimir Malyavko",
      art: "/placeholder.jpg",
    },
    {
      artist: "Ornella Binni",
      art: "/placeholder.jpg",
    },
    {
      artist: "Tom Byrom",
      art: "/placeholder.jpg",
    },
    {
      artist: "Vladimir Malyavko",
      art: "/placeholder.jpg",
    },
  ]

  return (
    <WrapperUI title="scroll area">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 py-4 pl-0 pr-4">
          {works.map((artwork, index) => (
            <figure key={index} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className="aspect-[3/4] h-fit w-fit object-cover"
                  width={300}
                  height={400}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                Photo by{" "}
                <span className="font-semibold text-foreground">
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </WrapperUI>
  )
}

const DialogClose = DialogPrimitive.Close

const ModalImageSlider = () => {
  const [isScaleImage, setIsScaleImage] = useState(false)

  const toggleScaleImage = () => {
    setIsScaleImage(!isScaleImage)
  }

  const images = [
    "/test1.webp",
    "/test2.webp",
    "/test3.jpg",
    "/placeholder.jpg",
    "/auth-image.jpg",
    "/auth-image2.jpg",
  ]

  return (
    <WrapperUI title="modal image slider">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative size-[300px] cursor-zoom-in rounded-md">
            <Image alt="modal image slider" src="/placeholder.jpg" fill />
          </div>
        </DialogTrigger>
        <DialogContent
          className="max-w-screen h-screen w-screen overflow-hidden p-0"
          closeIcon={false}
        >
          <Carousel
            opts={{
              loop: true,
            }}
            className="mx-auto h-full w-full max-w-[80%]"
          >
            <CarouselContent classNameParent="h-full">
              {images.map((image) => (
                <CarouselImageItem
                  key={image}
                  image={image}
                  toggleScaleImage={toggleScaleImage}
                  isScaleImage={isScaleImage}
                />
              ))}
            </CarouselContent>
            <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-5">
              <CarouselPrevious
                className="group relative -left-0 flex size-12 transform-none items-center justify-center rounded-full border-none bg-background shadow-md transition-all duration-300 hover:border-none hover:bg-primary"
                classNameIcon="size-6 group-hover:text-background transition-all duration-300"
              />
              <DialogClose className="group flex size-12 items-center justify-center rounded-full bg-background shadow-md transition-all duration-300 hover:bg-primary">
                <X className="size-6 text-primary transition-all duration-300 group-hover:text-background" />
              </DialogClose>
              <CarouselNext
                className="group relative -right-0 flex size-12 transform-none items-center justify-center rounded-full border-none bg-background shadow-md transition-all duration-300 hover:border-none hover:bg-primary"
                classNameIcon="size-6 group-hover:text-background transition-all duration-300"
              />
            </div>
          </Carousel>
        </DialogContent>
      </Dialog>
    </WrapperUI>
  )
}

const CarouselImageItem = ({ image, toggleScaleImage, isScaleImage }: any) => {
  return (
    <CarouselItem className="relative flex h-screen w-full items-center selection:bg-transparent">
      <Image
        onClick={toggleScaleImage}
        alt="modal image slider"
        src={image}
        fill
        className={cn(
          "cursor-zoom-in object-contain transition-all duration-300",
          isScaleImage &&
            "z-40 scale-150 cursor-zoom-out transition-all duration-300",
        )}
      />
    </CarouselItem>
  )
}

const ModalShareProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    setUrl(window.location.href)
  }, [router])

  const copyToClipboard = () => {
    // navigator.clipboard.writeText(window.location.toString())
    navigator.clipboard.writeText(url)
  }

  return (
    <WrapperUI title="modal share product">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            title="share product"
            className="group flex size-12 items-center justify-center rounded-full bg-background transition-all duration-300 hover:bg-primary"
          >
            <Share2
              strokeWidth={1.5}
              className="size-6 text-primary transition-all duration-300 group-hover:text-background"
            />
          </Button>
        </DialogTrigger>
        <DialogContent closeIcon={true} className="max-w-[85vw] sm:max-w-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-center font-semibold leading-snug">
              Bagikan product dan dapatkan diskon hingga 0.5%
            </DialogTitle>
          </DialogHeader>
          <div className="mb-6 flex gap-4 bg-secondary p-4">
            <div className="size-20 overflow-hidden">
              <Image
                src="/grainy.jpg"
                alt="blalba"
                className="size-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="flex w-full flex-col gap-2 overflow-hidden">
              <h4 className="truncate text-lg font-semibold">{`Keychron Q8 (Alice Layout) QMK Custom`}</h4>
              <p className="text-sm text-muted-foreground">
                {formatToIDR(1000000)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Mau bagikan lewat mana?</h4>
            <SocialShare url={url} />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">coba bagikan pake link?</h4>
            <div className="relative w-full">
              <Input
                className="h-12 border bg-transparent pr-10 text-sm placeholder:capitalize focus:border-primary"
                spellCheck="false"
                value={url}
              />
              <Button
                onClick={copyToClipboard}
                className="absolute right-0 top-0 size-12"
                variant="ghost"
              >
                <CopyIcon className="size-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </WrapperUI>
  )
}

const SocialShare = ({ url }: { url: string }) => {
  return (
    <div className="flex w-full items-center gap-3 overflow-x-auto">
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
      <LineShareButton url={url}>
        <button className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20">
          <LineIcon className="text-2xl" />
          <p className="sr-only">line</p>
        </button>
      </LineShareButton>
    </div>
  )
}
