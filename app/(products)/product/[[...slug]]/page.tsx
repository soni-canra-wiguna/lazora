"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { formatToIDR } from "@/utils/format-to-idr"
import { getSingleProduct } from "@/utils/get-products"
import { Heart, ShoppingCart } from "lucide-react"
import Balancer from "react-wrap-balancer"
import parse from "html-react-parser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { useUserClient } from "@/hook/use-user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/loading-button"
// import { useSearchParams } from 'next/navigation'

const SingleProductPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params
  // const params = useSearchParams()
  // const productId: string | null = params.get("productId" || null)
  const { data, isPending, isError } = getSingleProduct(slug[1])

  console.log(data)

  if (isPending) return <p className="pt-24">loading...</p>
  if (isError) return <p className="pt-24">error</p>

  return (
    <MaxWidthWrapper className="py-24 flex flex-col gap-20 max-w-7xl">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-5">
          <img
            src={data?.images[0].image}
            alt={data?.title}
            className="w-full aspect-[9/10] object-cover"
          />
        </div>
        <div className="col-span-7 flex flex-col">
          <h2 className="text-2xl font-bold mb-1">
            <Balancer>{data?.title}</Balancer>
          </h2>
          <div className="flex items-center gap-3 mb-5">
            {data?.categories?.map(({ title }) => (
              <p key={title} className="text-sm text-muted-foreground">
                {title}
              </p>
            ))}
          </div>
          <h6 className=" text-lg mb-3 font-semibold">
            {formatToIDR(data?.price)}
          </h6>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            stock: {data?.stock}
          </div>
          <div className="flex flex-col gap-3 mb-4">
            <Button>
              Add to Cart{" "}
              <ShoppingCart className="size-4 ml-2" strokeWidth={1.5} />
            </Button>
            <Button className="capitalize" variant="outline">
              favourite <Heart className="size-4 ml-2" strokeWidth={1.5} />
            </Button>
          </div>
          <div className="prose">{parse(data?.description)}</div>
        </div>
      </div>
      {/* comments */}
      <div className="flex flex-col gap-6">
        <h4 className="text-2xl font-semibold">review product</h4>
        <Comment comments={data?.comments} productId={slug[1]} />
      </div>
    </MaxWidthWrapper>
  )
}

export default SingleProductPage

const Comment = ({
  comments,
  productId,
}: {
  comments: string[]
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
    const dataPost = {
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
        {comments.map(({ message, image, username }) => (
          <div key={message} className="flex flex-col gap-1 justify-center">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={image} alt={username} />
                <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <h5 className="text-base font-semibold capitalize">{username}</h5>
            </div>
            <div className="prose">{parse(message)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
