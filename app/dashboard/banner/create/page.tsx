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
import { FORM_OPTIONS } from "@/data/form-options"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import authImage from "@/public/auth-image.jpg"
import Balancer from "react-wrap-balancer"
import { useForm } from "react-hook-form"
import { ArrowRight } from "lucide-react"
import { BannerSchema } from "@/schema"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import * as z from "zod"
import { useRouter } from "next/navigation"

const CreateBannerPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

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
      router.push("/")
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
      mutate(data)
    } catch (error) {
      throw new Error("failed to sign in")
    }
  }

  return (
    <MaxWidthWrapper className="my-32 flex flex-col gap-10">
      <PreviewBanner form={form} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="w-full grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-6 w-full">
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
            <div className="flex flex-col gap-6 w-full">
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
                              <SelectItem key={item.title} value={item.value}>
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
            <div className="p-4 bg-red-200 rounded-md text-center w-full">
              <p className="text-sm text-red-500">
                something went wrong, check your connection!!
              </p>
            </div>
          )}
          <LoadingButton
            type="submit"
            className="w-full capitalize mt-3"
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
  return (
    <div className="w-full h-full">
      <Card
        style={{
          backgroundColor: form.watch("background_color"),
        }}
        className="w-full h-[450px] border-none rounded-xl grid grid-cols-12 overflow-hidden"
      >
        <div className="col-span-7 flex items-center pl-20">
          <div className="flex flex-col">
            <h1 className="text-6xl font-canelaRegular mb-4 capitalize">
              <Balancer>{form.watch("title")}</Balancer>
            </h1>
            <p className="mb-6">{form.watch("description")}</p>
            <Button
              size="lg"
              className="capitalize w-max rounded-full font-canelaThin shimmer"
            >
              <Link href={form.watch("href_button")}>
                {form.watch("title_button")}
              </Link>
              <ArrowRight className="text-inherit size-4 ml-2 stroke-[1.5]" />
            </Button>
          </div>
        </div>
        <div className="col-span-5 flex items-center justify-center">
          <div className="size-[90%]">
            <Image
              src={form.watch("image") || authImage}
              width={600}
              height={600}
              alt={form.watch("alt_image")}
              className="size-full object-contain object-center"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
