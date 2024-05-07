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

  // elonmusk@gmail.com
  //Elon@31DWdf

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={handleAddComment}
        className="flex gap-3 w-full items-center"
      >
        <Input
          value={commentMessage}
          onChange={(e) => setCommentMessage(e.target.value)}
          disabled={!session}
          className="border bg-transparent border-primary"
          placeholder="tulis komentar kamu"
        />
        <LoadingButton
          loading={isPending}
          disabled={isPending || !session}
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
          comments.map(({ message, image, username }: any) => (
            // buat jadi component terpisah untuk comment ui
            <div key={message} className="flex flex-col gap-1 justify-center">
              <div className="flex items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage src={image} alt={username} />
                  <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <h5 className="text-base font-semibold capitalize">
                  {username}
                </h5>
              </div>
              <div className="prose">{parse(message)}</div>
            </div>
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
