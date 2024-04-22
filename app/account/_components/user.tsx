import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserServer } from "@/hook/use-user"
import LogoutButton from "./logout"

const User = async () => {
  const session = await useUserServer()

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar>
        <AvatarImage src={session?.image} />
        <AvatarFallback>{session?.username?.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <h1>{session?.username}</h1>
      <p>{session?.email}</p>
      <p>{session?.role}</p>
      <p>{session?.id}</p>
      <LogoutButton />
    </div>
  )
}

export default User
