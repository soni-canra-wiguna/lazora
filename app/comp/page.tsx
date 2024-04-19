"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { EllipsisVertical, ShoppingCart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ComponentsUI() {
  return (
    <div className="max-w-[1440px] w-full mx-auto min-h-screen my-40 flex flex-col gap-10">
      <ColorsUI />
      <ButtonUI />
      <CardUI />
      <InputUI />
      <ModalUI />
      <SheetUI />
      <DropdownUI />
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
      <h1 className="font-medium text-2xl">{title}</h1>
      {children}
    </div>
  )
}

const ColorsUI = () => {
  return (
    <WrapperUI title="colors">
      <div className="grid grid-cols-4 gap-4 w-full text-green-500">
        <div className="bg-background w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          background
        </div>
        <div className="bg-foreground w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          foreground
        </div>
        <div className="bg-card w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          card
        </div>
        <div className="bg-card-foreground w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          card foreground
        </div>
        <div className="bg-primary w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          primary
        </div>
        <div className="bg-primary-foreground w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          primary foreground
        </div>
        <div className="bg-secondary w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          secondary
        </div>
        <div className="bg-secondary-foreground w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          secondary foreground
        </div>
        <div className="bg-muted w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          muted
        </div>
        <div className="bg-muted-foreground w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          muted foreground
        </div>
        <div className="bg-accent w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          accent
        </div>
        <div className="bg-accent-foreground w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          accent foreground
        </div>
        <div className="bg-destructive w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          destructive
        </div>
        <div className="bg-destructive-foreground w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          destructive foreground
        </div>
        <div className="bg-border w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          border
        </div>
        <div className="bg-input w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          input
        </div>
        <div className="bg-ring w-full h-20 aspect-square border border-green-500 flex items-center justify-center">
          ring
        </div>
      </div>
    </WrapperUI>
  )
}

const ButtonUI = () => {
  return (
    <WrapperUI title="buttons(sm/default/lg)">
      <div className="flex gap-4 flex-wrap mb-5">
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
      <div className="flex gap-4 flex-wrap mb-5">
        <Button>default</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
      </div>
      <div className="flex gap-4 flex-wrap mb-5">
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
        <Card className="w-64 aspect-video">hello</Card>
        <Card className="w-64 aspect-video border-primary shadow-none">
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
        <div className="flex flex-col gap-2.5 max-w-md">
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
        <DialogContent className="max-w-xl aspect-square">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
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
