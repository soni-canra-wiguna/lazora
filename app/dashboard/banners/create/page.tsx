"use client"

import LoadingButton from "@/components/loading-button"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { UploadDropzone } from "@/lib/uploadthing"
import { FORM_OPTIONS } from "@/constants/form-options"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { BannerSchema } from "@/schema"
import axios from "axios"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { BannerItem } from "@/components/home/banner"
import { useUserClient } from "@/hook/use-user"
import { Role } from "@prisma/client"

const CreateBannerPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { session } = useUserClient()
  const isViewer = session?.user.role === Role.VIEWER

  const form = useForm<z.infer<typeof BannerSchema>>({
    resolver: zodResolver(BannerSchema),
    defaultValues: {
      title: "",
      description: "",
      title_button: "buy now",
      href_button: "",
      image: "",
      alt_image: "",
      background_color: "#d9f99d",
    },
  })

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["bannerPost"],
    mutationFn: async (data: z.infer<typeof BannerSchema>) => {
      await axios.post("/api/banners", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onSuccess: () => {
      form.reset()
      toast({
        title: "banner successfully created!!",
        description: "new banner successfully created!!",
      })
      queryClient.invalidateQueries({ queryKey: ["banners"] })
      router.push("/dashboard/products")
    },
    onError: () => {
      toast({
        title: "something went wrong!",
        description: "something went wrong, check your connection.",
        variant: "destructive",
      })
    },
  })

  function onSubmit(data: z.infer<typeof BannerSchema>) {
    try {
      if (isViewer) {
        toast({
          title: "Access Denied",
          description: "You do not have permission to perform this action.",
          variant: "destructive",
        })
      } else {
        mutate(data)
      }
    } catch (error) {
      throw new Error("[SUBMIT_BANNER_ERROR]")
    }
  }

  return (
    <MaxWidthWrapper className="mb-32 flex flex-col gap-10">
      <PreviewBanner form={form} />
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
                            {FORM_OPTIONS.colors.map((color) => (
                              <SelectItem key={color.title} value={color.value}>
                                <p className="flex items-center gap-3">
                                  <span
                                    style={{ backgroundColor: color.value }}
                                    className="inline-block size-6 rounded-full"
                                  />
                                  {color.value}
                                </p>
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
            create banner
          </LoadingButton>
        </form>
      </Form>
    </MaxWidthWrapper>
  )
}

export default CreateBannerPage

interface FormPreview {
  form: ReturnType<typeof useForm<z.infer<typeof BannerSchema>>>
}

const PreviewBanner = ({ form }: FormPreview) => {
  const bannerData = {
    title: form.watch("title"),
    description: form.watch("description"),
    background_color: form.watch("background_color"),
    title_button: form.watch("title_button"),
    href_button: form.watch("href_button"),
    image: form.watch("image"),
    alt_image: form.watch("alt_image"),
  }
  return <BannerItem {...bannerData} />
}
