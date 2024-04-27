"use client"

import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RegisterSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import axios from "axios"
import LoadingButton from "@/components/loading-button"
import AuthInput from "./auth-input"
import { Lock, MailIcon, User2, Image } from "lucide-react"
import { useState } from "react"
import AuthStatus from "./auth-status"
import FormWrapper from "./form-wrapper"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

const RegisterForm = ({ className }: { className?: string }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isFailedRegister, setIsFailedRegister] = useState<boolean>(false)
  const [isSuccesRegister, setIsSuccesRegister] = useState<boolean>(false)
  // const [isEmailExist, setIsEmailExist] = useState<boolean>(false)
  // const { users } = getUsersData()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "BUYER",
    },
  })

  const { isPending, mutate, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof RegisterSchema>) => {
      // const emailExists = users?.some((user) => user.email === data.email)
      // if (emailExists) {
      //   setIsEmailExist(true)
      // } else {
      await axios.post("/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      // }
    },
    onSuccess: () => {
      form.reset({
        username: "",
        email: "",
        password: "",
        role: "student",
      })

      // setIsEmailExist(false)
      setIsFailedRegister(false)
      setIsSuccesRegister(true)

      queryClient.invalidateQueries({ queryKey: ["usersData"] })
      router.back()
    },
    onError: () => {
      setIsFailedRegister(true)
    },
  })

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    try {
      mutate(data)
    } catch (error) {
      throw new Error("failed to post user")
    }
  }

  const registerConfig = {
    title: "create account!",
    desc: "buat akun untuk mendapatkan informasi dan notifikasi dari kami",
    href_title: "sign in",
    desc_href: "have an account",
  }

  return (
    <FormWrapper className={className} {...registerConfig}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-auto flex flex-col gap-6"
        >
          {/* <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>image</FormLabel>
                  <FormControl>
                    <AuthInput
                      type="text"
                      focus
                      icon={
                        <Image
                          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ml-4"
                          color="black"
                        />
                      }
                      placeholder="image"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          /> */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <AuthInput
                      type="text"
                      focus
                      icon={
                        <User2
                          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ml-4"
                          color="black"
                        />
                      }
                      placeholder="username"
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
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <AuthInput
                      type="email"
                      icon={
                        <MailIcon
                          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ml-4"
                          color="black"
                        />
                      }
                      placeholder="email"
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
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <AuthInput
                      type="password"
                      icon={
                        <Lock
                          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ml-4"
                          color="black"
                        />
                      }
                      revealPassword
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          {/* <FormField
            control={form.control}
            name="role"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-black rounded-full py-5 pl-6 pr-4 outline-none focus:outline-none ring-0 focus:ring-0">
                        <SelectValue placeholder="role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem className="" value="admin">
                          admin
                        </SelectItem>
                        <SelectItem className="" value="teacher">
                          teacher
                        </SelectItem>
                        <SelectItem className="" value="student">
                          student
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )
            }}
          /> */}

          {isFailedRegister && (
            <AuthStatus
              status="failed"
              message="Failed to register, try again!!"
            />
          )}
          {isSuccesRegister && (
            <AuthStatus status="succes" message="register successfully!!" />
          )}
          {isError && (
            <AuthStatus
              status="failed"
              message="connection error, try again!!"
            />
          )}

          <LoadingButton
            className="w-full rounded-full capitalize mt-3 selection:bg-transparent"
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            register
          </LoadingButton>
        </form>
      </Form>
    </FormWrapper>
  )
}

export default RegisterForm
