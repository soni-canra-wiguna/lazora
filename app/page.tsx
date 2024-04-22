import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserServer } from "@/hook/use-user"
import LogoutButton from "./account/_components/logout"

export default async function Home() {
  const session = await useUserServer()
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
      <Link href="/comp">components</Link>
      <div className="flex flex-col items-center gap-4">
        <Avatar>
          <AvatarImage src={session?.image} width={500} height={500} />
          <AvatarFallback>{session?.username?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h1>{session?.username}</h1>
        <p>{session?.email}</p>
        <p>{session?.role}</p>
        <p>{session?.id}</p>
        <LogoutButton />
      </div>
    </main>
  )
}
