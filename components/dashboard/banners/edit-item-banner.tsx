"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BannerSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Banner } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { BannerItem } from "@/components/home/banner"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/loading-button"
import { FORM_OPTIONS } from "@/constants/form-options"
import { UploadDropzone } from "@/lib/uploadthing"

type EditType = {
  banner: Banner
  setIsAction: (isAction: boolean) => void
}

const EditItemBanner = ({ banner, setIsAction }: EditType) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof BannerSchema>>({
    resolver: zodResolver(BannerSchema),
    defaultValues: {
      title: banner.title,
      description: banner.description,
      title_button: banner.title_button,
      href_button: banner.href_button,
      image: banner.image,
      alt_image: banner.alt_image,
      background_color: banner.background_color,
    },
  })

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["actionEditBanner"],
    mutationFn: async (data: z.infer<typeof BannerSchema>) => {
      await axios.patch(`/api/banners/${banner.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({ queryKey: ["banners"] })
      setIsAction(false)
      toast({
        title: "successfully updated",
        variant: "success",
      })
    },
    onError: () => {},
  })

  const onSubmit = (data: z.infer<typeof BannerSchema>) => {
    try {
      mutate(data)
    } catch (error) {
      throw new Error("something went wrong")
    }
  }

  const bannerData = {
    title: form.watch("title"),
    description: form.watch("description"),
    background_color: form.watch("background_color"),
    title_button: form.watch("title_button"),
    href_button: form.watch("href_button"),
    image: form.watch("image"),
    alt_image: form.watch("alt_image"),
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <div className="flex items-center justify-between px-2 py-1 transition-all hover:bg-muted">
          edit
          <Pencil size={18} strokeWidth={1.5} />
        </div>
      </DialogTrigger>
      <DialogContent className="h-[90vh] max-w-[1360px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogDescription>edit banner item</DialogDescription>
          <BannerItem {...bannerData} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-6"
            >
              <div className="grid w-full grid-cols-2 gap-6">
                <div className="flex w-full flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>title</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="masukkan title banner"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>description</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="masukkan description banner"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="title_button"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>title button</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="masukkan title button"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="href_button"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>href button</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="masukkan href button"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
                <div className="flex w-full flex-col gap-6">
                  <FormItem>
                    <FormLabel>image</FormLabel>
                    <UploadDropzone
                      endpoint="imageBanner"
                      onClientUploadComplete={(res) => {
                        if (!res) return
                        form.setValue("image", res[0].url)
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
                  </FormItem>
                  {/* image in here */}
                  <FormField
                    control={form.control}
                    name="alt_image"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>alt image</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="masukkan alt image"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  {/* for color */}
                  <FormField
                    control={form.control}
                    name="background_color"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>background color</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="background color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {FORM_OPTIONS.colors.map((item) => (
                                  <SelectItem
                                    key={item.title}
                                    value={item.value}
                                  >
                                    {item.value}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </div>
              {isError && (
                <div className="w-full rounded-md bg-red-200 p-4 text-center">
                  <p className="text-sm text-red-500">
                    something went wrong, check your connection!!
                  </p>
                </div>
              )}
              <LoadingButton
                type="submit"
                className="mt-3 w-full capitalize"
                loading={isPending}
                disabled={isPending}
              >
                update banner
              </LoadingButton>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditItemBanner
