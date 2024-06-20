"use client"

import LoadingButton from "@/components/loading-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useUserClient } from "@/hook/use-user"
import parse from "html-react-parser"
import censorWordMessage from "@/utils/censore-word"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CommentSchema } from "@/schema"
import { createSafeComment } from "@/lib/action"
import { useAction } from "next-safe-action/hooks"
import { MessageSquare } from "lucide-react"
import CustomTooltip from "@/components/custom-tooltip"

const CommentWS = ({
  comments,
  slug,
}: {
  comments: string[] | undefined | any
  slug: string[]
}) => {
  const productId = slug[1]
  const { session } = useUserClient()

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
      productId,
      // @ts-ignore
      username: session?.user.username,
      email: session?.user.email,
      image: session?.user.image,
      role: session?.user.role,
    },
  })

  const { execute, status, result } = useAction(createSafeComment, {
    onSuccess: () => {
      toast({
        title: "berhasil menambahkan comment",
        variant: "success",
      })
      form.reset()
    },
  })

  function onSubmit(data: z.infer<typeof CommentSchema>) {
    execute({
      comment: data.comment,
      productId,
      // @ts-ignore
      username: session?.user.username,
      email: session?.user.email,
      image: session?.user.image,
      role: session?.user.role,
    })
  }

  const commentValue = form.watch("comment")
  // @ts-ignore
  const isInputValid = commentValue?.length >= 5 && commentValue?.length <= 1000

  return (
    <div className="flex flex-col gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-3 w-full"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  {session ? (
                    <Input
                      disabled={status === "executing" || !session}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isInputValid) {
                          e.preventDefault()
                        }
                      }}
                      placeholder="tulis komentar kamu (min 5 karakter)"
                      className="border bg-transparent border-primary w-full"
                      {...field}
                    />
                  ) : (
                    <CustomTooltip
                      side="bottom"
                      title="login untuk memberikan komentar"
                      className="rounded-md text-primary bg-secondary"
                    >
                      <Input
                        disabled={status === "executing" || !session}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !isInputValid) {
                            e.preventDefault()
                          }
                        }}
                        placeholder="tulis komentar kamu (min 5 karakter)"
                        className="border bg-transparent border-primary w-full"
                        {...field}
                      />
                    </CustomTooltip>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            disabled={status === "executing" || !session || !isInputValid}
            loading={status === "executing"}
            type="submit"
            className="capitalize w-max"
          >
            add comment
          </LoadingButton>
        </form>
      </Form>
      <div className="flex flex-col divide-y *:py-4 first:*:pt-0 last:*:pb-0 divide-secondary">
        {comments?.length > 0 ? (
          comments.map((comment: any) => (
            // buat jadi component terpisah untuk comment ui
            <UserComment key={comment.id} {...comment} />
          ))
        ) : (
          <div
            className={`${
              status === "executing" ? "hidden" : "block"
            } flex flex-col gap-3 py-8 items-center justify-center text-muted-foreground/50`}
          >
            <MessageSquare className="size-16 stroke-[1.5] text-inherit" />
            <p className="text-inherit">Jadilah yang pertama berkomentar</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentWS

const UserComment = ({
  id,
  image,
  username,
  email,
  message,
  createdAt,
  role,
  productId,
}: any) => {
  const censoreMessage = censorWordMessage(message)

  return (
    <div className="flex flex-col gap-1 justify-center">
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage src={image} alt={username} />
          <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h5 className="text-base font-semibold capitalize">{username}</h5>
      </div>
      <div className="prose">{parse(censoreMessage)}</div>
    </div>
  )
}
