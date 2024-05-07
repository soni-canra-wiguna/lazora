import LoadingButton from "@/components/loading-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useUserClient } from "@/hook/use-user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import parse from "html-react-parser"
import { Comment as CommentProps } from "@prisma/client"
import { MessageSquare } from "lucide-react"

const Comment = ({
  comments,
  productId,
}: {
  comments: string[] | undefined | any
  productId: string
}) => {
  const [commentMessage, setCommentMessage] = useState("")
  const { session } = useUserClient()
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data) => {
      await axios.post("/api/comments", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onMutate: () => {},
    onSuccess: () => {
      setCommentMessage("")
      queryClient.invalidateQueries({ queryKey: [productId] })
      console.log("uhuy berhasil")
    },
    onError: () => {
      console.log("gagal post commentnya nih")
    },
    onSettled: () => {},
  })

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    const dataPost: any = {
      username: session?.user.username,
      image: session?.user.image,
      email: session?.user.email,
      role: session?.user.role,
      message: commentMessage,
      productId,
    }

    mutate(dataPost)
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleAddComment} className="flex gap-3 w-full">
        <div className="flex w-full flex-col gap-2 h-max">
          <Input
            value={commentMessage}
            onChange={(e) => setCommentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                (commentMessage.length < 5 || commentMessage.length > 1000)
              ) {
                e.preventDefault()
              }
            }}
            disabled={isPending || !session}
            className="border bg-transparent border-primary"
            placeholder="tulis komentar kamu (min 5 karakter)"
          />
          {commentMessage.length > 1000 && (
            <p className="text-xs text-red-500">
              maksimal komentar adalah 1000 karakter
            </p>
          )}
        </div>
        <LoadingButton
          loading={isPending}
          disabled={
            isPending ||
            !session ||
            commentMessage.length < 5 ||
            commentMessage.length > 1000
          }
          type="submit"
        >
          add comment
        </LoadingButton>
      </form>
      <div className="flex flex-col divide-y *:py-4 first:*:pt-0 last:*:pb-0 divide-secondary">
        {isPending && (
          <div className="flex flex-col gap-1 justify-center opacity-70">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage
                  src={session?.user.image}
                  // @ts-ignore
                  alt={session?.user.username}
                />
                <AvatarFallback>
                  {session?.user?.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h5 className="text-base font-semibold">
                {session?.user.username}
              </h5>
            </div>
            <div className="prose">{parse(commentMessage)}</div>
          </div>
        )}
        {comments?.length > 0 ? (
          comments.map((comment: any) => (
            // buat jadi component terpisah untuk comment ui
            <UserComment key={comment.id} {...comment} />
          ))
        ) : (
          <div
            className={`${
              isPending ? "hidden" : "block"
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

export default Comment

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
  // example output
  // createdAt : "2024-05-07T01:42:32.316Z"
  // email : "elonmusk@gmail.com"
  // id : "6639870872c755b3af8a410c"
  // image : null
  // message : "aigoooo"
  // productId : "66397ee775695491a8aa499e"
  // role : "BUYER"
  // updatedAt : "2024-05-07T01:42:32.316Z"
  // username : "elon musk"

  return (
    <div className="flex flex-col gap-1 justify-center">
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage src={image} alt={username} />
          <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h5 className="text-base font-semibold capitalize">{username}</h5>
      </div>
      <div className="prose">{parse(message)}</div>
    </div>
  )
}
