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

type DeleteType = {
  id: string
  setIsAction: (isAction: boolean) => void
}

const DeleteItemProduct = ({ id, setIsAction }: DeleteType) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openCloseModalDialog = () => {
    setIsOpen(!isOpen)
  }

  const {
    mutate: deleteItemProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/products/${id}`)
    },
    onSuccess: () => {
      toast({
        description: "product was deleted!!",
        variant: "destructive",
      })

      openCloseModalDialog()
      setIsAction(false)
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["shuffle-products"] })
    },
    onError: () => {
      openCloseModalDialog()
      setIsAction(false)
      toast({
        description: "something went wrong, try again!!",
      })
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="flex justify-between items-center px-2 py-1 hover:bg-muted transition-all">
          delete
          <Trash2 size={18} strokeWidth={1.5} color="#ff0000" />
        </div>
      </DialogTrigger>
      <DialogContent closeIcon={false} className="max-w-[85vw] sm:max-w-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-semibold text-left leading-snug">
            Apakah anda yakin ingin menghapus banner ini?
          </DialogTitle>
          <DialogDescription className="text-left">
            aksi ini akan menghapus banner secara permanen dari server, apakah
            anda yakin ingin menghapusnya?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex sm:flex-row items-center justify-end gap-4">
          <Button
            className="w-full sm:w-max"
            variant="outline"
            onClick={openCloseModalDialog}
          >
            kembali
          </Button>
          <LoadingButton
            disabled={isPending}
            onClick={() => deleteItemProduct()}
            className="w-full sm:w-max"
          >
            {isPending ? "loading..." : "hapus"}
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteItemProduct
