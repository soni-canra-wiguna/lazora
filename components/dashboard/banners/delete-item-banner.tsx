"use client"

import { Loader2, Trash2 } from "lucide-react"
import React, { useState } from "react"
import axios from "axios"
import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import LoadingButton from "@/components/loading-button"
import { useUserClient } from "@/hook/use-user"
import { Role } from "@prisma/client"

type DeleteType = {
  id: string
  setIsAction: (isAction: boolean) => void
}

const DeleteItemBanner = ({ id, setIsAction }: DeleteType) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { session } = useUserClient()
  const isViewer = session?.user.role === Role.VIEWER

  const openCloseModalDialog = () => {
    setIsOpen(!isOpen)
  }

  const {
    mutate: deleteItemBanner,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/banners/${id}`)
    },
    onSuccess: () => {
      toast({
        description: "banner was deleted!!",
        variant: "destructive",
      })

      openCloseModalDialog()
      setIsAction(false)
      queryClient.invalidateQueries({ queryKey: ["banners"] })
    },
    onError: () => {
      openCloseModalDialog()
      setIsAction(false)
      toast({
        description: "something went wrong, try again!!",
      })
    },
  })

  const handleDeleteItemBanner = () => {
    if (isViewer) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to perform this action.",
        variant: "destructive",
      })
    } else {
      deleteItemBanner()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <div className="flex items-center justify-between px-2 py-1 transition-all hover:bg-muted">
          delete
          <Trash2 size={18} strokeWidth={1.5} color="#ff0000" />
        </div>
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
          <LoadingButton
            disabled={isPending}
            onClick={handleDeleteItemBanner}
            className="w-full sm:w-max"
          >
            {isPending ? "loading..." : "delete"}
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteItemBanner
