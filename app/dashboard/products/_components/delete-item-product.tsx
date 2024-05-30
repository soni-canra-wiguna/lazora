"use client"

import { Loader2, Trash2 } from "lucide-react"
import React, { useState } from "react"
import axios from "axios"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"

type DeleteType = {
  id: string
  setIsAction: (isAction: boolean) => void
}

const DeleteItemProduct = ({ id, setIsAction }: DeleteType) => {
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState<boolean>(false)

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

      setIsOpen(false)
      setIsAction(false)
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: () => {
      setIsAction(false)
      toast({
        description: "something went wrong, try again!!",
      })
    },
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        title="delete post"
        className="cursor-pointer"
        asChild
      >
        <div className="flex justify-between items-center px-2 py-1 hover:bg-muted transition-all">
          delete
          <Trash2 size={18} strokeWidth={1.5} color="#ff0000" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[85vw] md:max-w-lg p-4 md:p-6">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah anda yakin ingin menghapus product ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            aksi ini akan menghapus product secara permanen dari server, apakah
            anda yakin ingin menghapusnya?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsAction(false)}>
            Kembali
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => deleteItemProduct()}
          >
            {isPending ? "loading..." : "hapus"}
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteItemProduct
