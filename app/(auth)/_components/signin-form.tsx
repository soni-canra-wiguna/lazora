"use client"

import { useState } from "react"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { SignInSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import AuthStatus from "./auth-status"
import LoadingButton from "@/components/loading-button"
import AuthInput from "./auth-input"
import { Lock, MailIcon } from "lucide-react"
import FormWrapper from "./form-wrapper"

const SignInForm = () => {
  const router = useRouter()
  const [isFailedSignIn, setIsFailedSignIn] = useState<boolean>(false)
  const [isSuccesSignIn, setIsSuccesSignIn] = useState<boolean>(false)
  const [isErrorSignIn, setIsErrorSignIn] = useState<boolean>(false)
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isPending, mutate, isError } = useMutation({
    mutationKey: ["credentialsPost"],
    mutationFn: async (data: z.infer<typeof SignInSchema>) => {
      const isCorrectAccount = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (isCorrectAccount?.ok) {
        setIsFailedSignIn(false)
        setIsSuccesSignIn(true)
        router.refresh()
        router.push("/")
      } else {
        setIsFailedSignIn(true)
      }
    },
    onError: () => {
      setIsErrorSignIn(true)
    },
  })

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    try {
      mutate(data)
    } catch (error) {
      throw new Error("failed to sign in")
    }
  }

  const signInConfig = {
    title: "Welcome back!",
    desc: "untuk bisa berbelanja kamu bisa login terlebih dahulu.",
    href_title: "register",
    desc_href: "don't have an account",
  }

  return (
    <FormWrapper {...signInConfig}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-auto flex flex-col gap-6"
        >
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
                      focus
                      icon={
                        <MailIcon
                          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ml-4"
                          color="black"
                        />
                      }
                      placeholder="masukkan email anda"
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
                      placeholder="masukkan password anda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          {isFailedSignIn && (
            <AuthStatus
              status="failed"
              message="Failed to sign in, invalid email or password!!"
            />
          )}
          {isSuccesSignIn && (
            <AuthStatus status="succes" message="Sign in successfully!!" />
          )}
          {(isErrorSignIn || isError) && (
            <AuthStatus
              status="failed"
              message="connection error, try again!!"
            />
          )}
          <LoadingButton
            type="submit"
            className="w-full rounded-full capitalize mt-3"
            loading={isPending}
            disabled={isPending}
          >
            sign in
          </LoadingButton>
        </form>
      </Form>
    </FormWrapper>
  )
}

export default SignInForm
